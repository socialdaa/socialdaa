const LEAD_STATUSES = ["New", "Contacted", "Qualified", "Not a fit"];

function sendError(response, status, message) {
  return response.status(status).json({ error: message });
}

function isValidApplication(application) {
  return (
    application &&
    typeof application.name === "string" &&
    application.name.trim() &&
    typeof application.email === "string" &&
    application.email.trim() &&
    typeof application.phone === "string" &&
    application.phone.trim() &&
    typeof application.profession === "string" &&
    application.profession.trim()
  );
}

export default async function handler(request, response) {
  const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  const appsScriptSecret = process.env.GOOGLE_APPS_SCRIPT_SECRET;

  if (!appsScriptUrl || !appsScriptSecret) {
    return sendError(
      response,
      503,
      "Shared lead storage is not configured. Please contact the site administrator.",
    );
  }

  if (!["GET", "POST", "PATCH"].includes(request.method)) {
    response.setHeader("Allow", "GET, POST, PATCH");
    return sendError(response, 405, "Method not allowed.");
  }

  const dashboardKey = process.env.DASHBOARD_ACCESS_KEY;
  if (request.method !== "POST") {
    const providedKey = request.headers.authorization?.replace(/^Bearer\s+/i, "");
    if (!dashboardKey || providedKey !== dashboardKey) {
      return sendError(response, 401, "Invalid dashboard access code.");
    }
  }

  let action;
  let payload = {};

  if (request.method === "GET") {
    action = "list";
  } else {
    payload = request.body;

    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      return sendError(response, 400, "Invalid request body.");
    }

    action = payload.action;
    if (
      request.method === "POST" &&
      (action !== "create" || !isValidApplication(payload.application))
    ) {
      return sendError(response, 400, "Application details are incomplete.");
    }

    if (
      request.method === "PATCH" &&
      ((action === "updateStatus" &&
        (typeof payload.id !== "string" ||
          !LEAD_STATUSES.includes(payload.status))) ||
        (action === "importLocal" &&
          (!Array.isArray(payload.leads) ||
            payload.leads.length > 1000 ||
            !payload.leads.every(
              (lead) =>
                lead &&
                typeof lead.id === "string" &&
                typeof lead.name === "string" &&
                typeof lead.email === "string" &&
                typeof lead.phone === "string" &&
                typeof lead.createdAt === "string",
            ))) ||
        !["updateStatus", "importLocal"].includes(action))
    ) {
      return sendError(response, 400, "Lead status update is invalid.");
    }
  }

  try {
    const url = new URL(appsScriptUrl);
    if (request.method === "GET") {
      url.searchParams.set("secret", appsScriptSecret);
    }

    const upstream = await fetch(url, {
      method: request.method === "GET" ? "GET" : "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      ...(request.method === "GET"
        ? { redirect: "follow" }
        : {
            body: JSON.stringify({
              ...payload,
              action,
              secret: appsScriptSecret,
            }),
          }),
    });

    const result = await upstream.json();

    if (!upstream.ok || result.error) {
      console.error("Google Sheets lead service returned an error.", {
        status: upstream.status,
        error: result.error,
      });
      return sendError(
        response,
        502,
        result.error || "Google Sheets could not process the lead request.",
      );
    }

    if (request.method === "GET") {
      return response.status(200).json(result);
    }

    return response.status(200).json(result);
  } catch (error) {
    console.error("Could not reach the Google Sheets lead service.", error);
    return sendError(
      response,
      502,
      "Could not reach shared lead storage. Please try again.",
    );
  }
}
