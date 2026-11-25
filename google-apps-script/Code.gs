const SHEET_ID = "1J1nVzjd-c_cDwALb03Zx0Pis1U5Czzi6LtuJqthr6hM";
const LEADS_SHEET_NAME = "Leads";
const HEADERS = [
  "ID",
  "Name",
  "Email",
  "Phone",
  "Brand",
  "Role",
  "Profession",
  "Social",
  "Expectations",
  "Revenue",
  "Budget",
  "Status",
  "Created At",
];
const STATUSES = ["New", "Contacted", "Qualified", "Not a fit"];

function doGet(event) {
  try {
    if (!isAuthorized(event.parameter.secret)) {
      return jsonOutput({ error: "Unauthorized." });
    }

    return jsonOutput({ leads: getLeads() });
  } catch (error) {
    console.error("Could not read leads from the spreadsheet.", error);
    return jsonOutput({ error: "Could not read leads from the spreadsheet." });
  }
}

function doPost(event) {
  let payload;

  try {
    payload = JSON.parse(event.postData.contents);
  } catch (error) {
    return jsonOutput({ error: "Invalid request body." });
  }

  if (!isAuthorized(payload.secret)) {
    return jsonOutput({ error: "Unauthorized." });
  }

  if (payload.action === "create") {
    return createLead(payload.application);
  }

  if (payload.action === "updateStatus") {
    return updateLeadStatus(payload.id, payload.status);
  }

  if (payload.action === "importLocal") {
    return importLocalLeads(payload.leads);
  }

  return jsonOutput({ error: "Unsupported lead action." });
}

function isAuthorized(secret) {
  const expectedSecret =
    PropertiesService.getScriptProperties().getProperty("API_SECRET");
  return Boolean(expectedSecret && secret && secret === expectedSecret);
}

function getLeadsSheet() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName(LEADS_SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(LEADS_SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function getLeads() {
  const sheet = getLeadsSheet();
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    return [];
  }

  const rows = sheet.getRange(2, 1, lastRow - 1, HEADERS.length).getValues();

  return rows
    .filter(function (row) {
      return row[0];
    })
    .map(function (row) {
      return {
        id: String(row[0]),
        name: String(row[1]),
        email: String(row[2]),
        phone: String(row[3]),
        brand: String(row[4]),
        role: String(row[5]),
        profession: String(row[6]),
        social: String(row[7]),
        expectations: String(row[8]),
        revenue: String(row[9]),
        budget: String(row[10]),
        status: String(row[11]),
        createdAt: toIsoString(row[12]),
      };
    })
    .reverse();
}

function toIsoString(value) {
  const date = value instanceof Date ? value : new Date(value);
  return isNaN(date.getTime()) ? "" : date.toISOString();
}

function createLead(application) {
  if (
    !application ||
    !application.name ||
    !application.email ||
    !application.phone ||
    !application.profession
  ) {
    return jsonOutput({ error: "Application details are incomplete." });
  }

  const lead = {
    id: Utilities.getUuid(),
    name: String(application.name).trim(),
    email: String(application.email).trim(),
    phone: String(application.phone).trim(),
    brand: String(application.brand || ""),
    role: String(application.role || ""),
    profession: String(application.profession).trim(),
    social: String(application.social || ""),
    expectations: String(application.expectations || ""),
    revenue: String(application.revenue || ""),
    budget: String(application.budget || ""),
    status: "New",
    createdAt: new Date().toISOString(),
  };
  const row = HEADERS.map(function (header) {
    return lead[
      {
        ID: "id",
        Name: "name",
        Email: "email",
        Phone: "phone",
        Brand: "brand",
        Role: "role",
        Profession: "profession",
        Social: "social",
        Expectations: "expectations",
        Revenue: "revenue",
        Budget: "budget",
        Status: "status",
        "Created At": "createdAt",
      }[header]
    ];
  });
  const sheet = getLeadsSheet();
  const lock = LockService.getScriptLock();

  lock.waitLock(10000);
  try {
    const nextRow = sheet.getLastRow() + 1;
    sheet.getRange(nextRow, 1, 1, HEADERS.length).setNumberFormat("@");
    sheet.getRange(nextRow, 1, 1, HEADERS.length).setValues([row]);
  } finally {
    lock.releaseLock();
  }

  return jsonOutput({ lead: lead });
}

function updateLeadStatus(id, status) {
  if (!id || STATUSES.indexOf(status) === -1) {
    return jsonOutput({ error: "Lead status update is invalid." });
  }

  const sheet = getLeadsSheet();
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    return jsonOutput({ error: "Lead could not be found." });
  }

  const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  const rowIndex = ids.findIndex(function (row) {
    return String(row[0]) === id;
  });

  if (rowIndex === -1) {
    return jsonOutput({ error: "Lead could not be found." });
  }

  sheet.getRange(rowIndex + 2, 12).setValue(status);
  return jsonOutput({ leads: getLeads() });
}

function importLocalLeads(leads) {
  if (!Array.isArray(leads) || leads.length > 1000) {
    return jsonOutput({ error: "Local lead import is invalid." });
  }

  const sheet = getLeadsSheet();
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const lastRow = sheet.getLastRow();
    const existingIds =
      lastRow < 2
        ? []
        : sheet
            .getRange(2, 1, lastRow - 1, 1)
            .getValues()
            .map(function (row) {
              return String(row[0]);
            });
    const seenIds = new Set(existingIds);
    const newRows = [];

    leads.forEach(function (lead) {
      if (
        !lead ||
        typeof lead.id !== "string" ||
        !lead.id ||
        typeof lead.name !== "string" ||
        typeof lead.email !== "string" ||
        typeof lead.phone !== "string" ||
        typeof lead.createdAt !== "string" ||
        seenIds.has(lead.id)
      ) {
        return;
      }

      seenIds.add(lead.id);
      const submittedAt = new Date(lead.createdAt);
      newRows.push([
        lead.id,
        lead.name,
        lead.email,
        lead.phone,
        String(lead.brand || ""),
        String(lead.role || ""),
        String(lead.profession || ""),
        String(lead.social || ""),
        String(lead.expectations || ""),
        String(lead.revenue || ""),
        String(lead.budget || ""),
        STATUSES.indexOf(lead.status) === -1 ? "New" : lead.status,
        isNaN(submittedAt.getTime())
          ? new Date().toISOString()
          : submittedAt.toISOString(),
      ]);
    });

    if (newRows.length) {
      const startRow = sheet.getLastRow() + 1;
      sheet
        .getRange(startRow, 1, newRows.length, HEADERS.length)
        .setNumberFormat("@");
      sheet
        .getRange(startRow, 1, newRows.length, HEADERS.length)
        .setValues(newRows);
    }

    return jsonOutput({ leads: getLeads(), importedCount: newRows.length });
  } finally {
    lock.releaseLock();
  }
}

function jsonOutput(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
