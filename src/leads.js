const LEADS_STORAGE_KEY = "socialdaa-leads";
export const LEADS_CHANGED_EVENT = "socialdaa-leads-changed";
const LEAD_STATUSES = ["New", "Contacted", "Qualified", "Not a fit"];

function isStoredLead(lead) {
  return (
    lead &&
    typeof lead === "object" &&
    ["id", "name", "email", "phone", "status", "createdAt"].every(
      (key) => typeof lead[key] === "string",
    ) &&
    LEAD_STATUSES.includes(lead.status)
  );
}

export function readLeads() {
  const savedLeads = window.localStorage.getItem(LEADS_STORAGE_KEY);

  if (!savedLeads) return [];

  try {
    const leads = JSON.parse(savedLeads);

    if (!Array.isArray(leads) || !leads.every(isStoredLead)) {
      throw new Error("Saved lead data is invalid.");
    }

    return leads;
  } catch {
    throw new Error("Saved lead data is invalid.");
  }
}

export function saveLead(application) {
  const lead = {
    ...application,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    status: "New",
    createdAt: new Date().toISOString(),
  };

  window.localStorage.setItem(
    LEADS_STORAGE_KEY,
    JSON.stringify([lead, ...readLeads()]),
  );
  window.dispatchEvent(
    new CustomEvent(LEADS_CHANGED_EVENT, { detail: [lead, ...readLeads()] }),
  );

  return lead;
}

export function updateLeadStatus(id, status) {
  if (!LEAD_STATUSES.includes(status)) {
    throw new Error("Lead status is invalid.");
  }

  const leads = readLeads();
  const updatedLeads = leads.map((lead) =>
    lead.id === id ? { ...lead, status } : lead,
  );

  if (!leads.some((lead) => lead.id === id)) {
    throw new Error("Lead could not be found.");
  }

  window.localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updatedLeads));
  return updatedLeads;
}
