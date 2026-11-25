const LEAD_API_URL = "/api/leads";
const LEAD_STATUSES = ["New", "Contacted", "Qualified", "Not a fit"];

async function requestLeads({ method = "GET", accessKey, body } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (accessKey) {
    headers.Authorization = `Bearer ${accessKey}`;
  }

  const response = await fetch(LEAD_API_URL, {
    method,
    headers,
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  let result;
  try {
    result = await response.json();
  } catch {
    throw new Error("Lead service returned an invalid response.");
  }

  if (!response.ok) {
    throw new Error(result.error || "Lead service request failed.");
  }

  if (method === "POST" && !result.lead?.id) {
    throw new Error("Shared lead storage did not confirm the submission.");
  }

  if ((method === "GET" || method === "PATCH") && !Array.isArray(result.leads)) {
    throw new Error("Lead service returned invalid data.");
  }

  return result;
}

export async function readLeads(accessKey) {
  const result = await requestLeads({ accessKey });
  return result.leads;
}

export async function saveLead(application) {
  const result = await requestLeads({
    method: "POST",
    body: { action: "create", application },
  });

  return result.lead;
}

export async function updateLeadStatus(id, status, accessKey) {
  if (!LEAD_STATUSES.includes(status)) {
    throw new Error("Lead status is invalid.");
  }

  const result = await requestLeads({
    method: "PATCH",
    accessKey,
    body: { action: "updateStatus", id, status },
  });

  return result.leads;
}

export async function migrateLocalLeads(accessKey) {
  const savedLeads = window.localStorage.getItem("socialdaa-leads");
  if (!savedLeads) return;

  let leads;
  try {
    leads = JSON.parse(savedLeads);
  } catch {
    throw new Error("Old device leads could not be read for migration.");
  }

  if (
    !Array.isArray(leads) ||
    !leads.every(
      (lead) =>
        lead &&
        typeof lead.id === "string" &&
        typeof lead.name === "string" &&
        typeof lead.email === "string" &&
        typeof lead.phone === "string" &&
        typeof lead.createdAt === "string",
    )
  ) {
    throw new Error("Old device leads have an invalid format.");
  }

  if (!leads.length) return;

  await requestLeads({
    method: "PATCH",
    accessKey,
    body: { action: "importLocal", leads },
  });
  window.localStorage.removeItem("socialdaa-leads");
}
