import { Fragment, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  migrateLocalLeads,
  readLeads,
  updateLeadStatus,
} from "../leads.js";
import "./LeadsDashboard.css";

const statuses = ["New", "Contacted", "Qualified", "Not a fit"];

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function escapeCsv(value) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

export default function LeadsDashboard() {
  const [leads, setLeads] = useState([]);
  const [accessKey, setAccessKey] = useState(
    () => window.sessionStorage.getItem("socialdaa-dashboard-key") || "",
  );
  const [accessCode, setAccessCode] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(Boolean(accessKey));
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All leads");
  const [expandedLeadId, setExpandedLeadId] = useState(null);

  useEffect(() => {
    if (!accessKey) return undefined;

    let active = true;
    let migrationComplete = false;
    const refreshLeads = async () => {
      try {
        if (!migrationComplete) {
          await migrateLocalLeads(accessKey);
          migrationComplete = true;
        }
        const sharedLeads = await readLeads(accessKey);
        if (!active) return;
        setLeads(sharedLeads);
        setAuthenticated(true);
        setError("");
      } catch (loadError) {
        if (!active) return;
        setError(loadError.message || "Shared leads couldn't be loaded.");
        if (loadError.message === "Invalid dashboard access code.") {
          window.sessionStorage.removeItem("socialdaa-dashboard-key");
          setAccessKey("");
          setAuthenticated(false);
        }
      }
    };

    refreshLeads().finally(() => {
      if (active) setIsLoading(false);
    });
    const refreshInterval = window.setInterval(refreshLeads, 30000);
    window.addEventListener("focus", refreshLeads);

    return () => {
      active = false;
      window.clearInterval(refreshInterval);
      window.removeEventListener("focus", refreshLeads);
    };
  }, [accessKey]);

  async function submitAccessCode(event) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const sharedLeads = await readLeads(accessCode.trim());
      window.sessionStorage.setItem(
        "socialdaa-dashboard-key",
        accessCode.trim(),
      );
      setLeads(sharedLeads);
      setAccessKey(accessCode.trim());
      setAuthenticated(true);
      setAccessCode("");
    } catch (loginError) {
      setError(loginError.message || "Could not connect to shared lead storage.");
    } finally {
      setIsLoading(false);
    }
  }

  function logOut() {
    window.sessionStorage.removeItem("socialdaa-dashboard-key");
    setAccessKey("");
    setAuthenticated(false);
    setLeads([]);
  }

  const visibleLeads = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return leads.filter((lead) => {
      const matchesFilter =
        activeFilter === "All leads" || lead.status === activeFilter;
      const matchesQuery =
        !normalizedQuery ||
        [lead.name, lead.email, lead.phone, lead.profession, lead.role]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(normalizedQuery));

      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, leads, query]);

  const newLeads = leads.filter((lead) => lead.status === "New").length;
  const contactedLeads = leads.filter(
    (lead) => lead.status === "Contacted",
  ).length;
  const qualifiedLeads = leads.filter(
    (lead) => lead.status === "Qualified",
  ).length;

  async function changeStatus(id, status) {
    try {
      setLeads(await updateLeadStatus(id, status, accessKey));
      setError("");
    } catch (statusError) {
      setError(statusError.message || "We couldn't update this lead.");
    }
  }

  function exportLeads() {
    const columns = [
      "Name",
      "Email",
      "Phone",
      "Brand",
      "Role",
      "Profession",
      "Social profile",
      "Expectation",
      "Revenue",
      "Budget",
      "Status",
      "Submitted",
    ];
    const rows = leads.map((lead) =>
      [
        lead.name,
        lead.email,
        lead.phone,
        lead.brand,
        lead.role,
        lead.profession,
        lead.social,
        lead.expectations,
        lead.revenue,
        lead.budget,
        lead.status,
        lead.createdAt,
      ]
        .map(escapeCsv)
        .join(","),
    );
    const file = new Blob([[columns.map(escapeCsv).join(","), ...rows].join("\n")], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(file);
    const downloadLink = document.createElement("a");

    downloadLink.href = url;
    downloadLink.download = "socialdaa-leads.csv";
    downloadLink.click();
    URL.revokeObjectURL(url);
  }

  if (!authenticated) {
    return (
      <main className="dashboard-login-page">
        <form className="dashboard-login-card" onSubmit={submitAccessCode}>
          <Link to="/" className="dashboard-logo" aria-label="Socialdaa home">
            SOCIAL<i>DAA</i>
          </Link>
          <p className="dashboard-eyebrow">SOCIALDAA · LEAD MANAGEMENT</p>
          <h1>Lead dashboard</h1>
          <p>Enter your dashboard access code to view shared applications.</p>
          <label htmlFor="dashboard-access-code">Dashboard access code</label>
          <input
            id="dashboard-access-code"
            type="password"
            autoComplete="current-password"
            value={accessCode}
            onChange={(event) => setAccessCode(event.target.value)}
            required
          />
          {error && (
            <p className="dashboard-error" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="dashboard-login-button"
            disabled={isLoading}
          >
            {isLoading ? "Connecting..." : "Open dashboard"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <div className="leads-dashboard">
      <aside className="dashboard-sidebar">
        <Link to="/" className="dashboard-logo" aria-label="Socialdaa home">
          SOCIAL<i>DAA</i>
        </Link>

        <span className="dashboard-nav-label">WORKSPACE</span>
        <nav className="dashboard-nav" aria-label="Dashboard navigation">
          <a className="dashboard-nav-item active" href="#overview">
            <span aria-hidden="true">▦</span> Overview
          </a>
          <a className="dashboard-nav-item" href="#leads">
            <span aria-hidden="true">◉</span> Leads
            <span className="dashboard-nav-count">{leads.length}</span>
          </a>
        </nav>

        <div className="dashboard-sidebar-footer">
          <span className="dashboard-status-indicator" />
          <span>Website applications</span>
          <small>Saved in this browser</small>
        </div>
      </aside>

      <main className="dashboard-main" id="overview">
        <header className="dashboard-topbar">
          <div className="dashboard-breadcrumb">
            Workspace <span>/</span> Overview
          </div>
          <Link to="/" className="dashboard-website-link">
            Visit website <span aria-hidden="true">↗</span>
          </Link>
          <button
            type="button"
            className="dashboard-logout-button"
            onClick={logOut}
          >
            Log out
          </button>
        </header>

        <div className="dashboard-content">
          <section className="dashboard-heading">
            <div>
              <p className="dashboard-eyebrow">SOCIALDAA · LEAD MANAGEMENT</p>
              <h1>Lead dashboard</h1>
              <p className="dashboard-description">
                Every application from your website, organized in one place.
              </p>
            </div>
            <button
              type="button"
              className="dashboard-export-button"
              onClick={exportLeads}
              disabled={!leads.length}
            >
              <span aria-hidden="true">↓</span> Export CSV
            </button>
          </section>

          {error && (
            <p className="dashboard-error" role="alert">
              {error}
            </p>
          )}

          <section className="dashboard-stats" aria-label="Lead summary">
            <article className="dashboard-stat-card">
              <span className="dashboard-stat-icon total" aria-hidden="true">
                ◉
              </span>
              <p>Total applications</p>
              <strong>{leads.length}</strong>
              <small>All website submissions</small>
            </article>
            <article className="dashboard-stat-card">
              <span className="dashboard-stat-icon new" aria-hidden="true">
                ✦
              </span>
              <p>New leads</p>
              <strong>{newLeads}</strong>
              <small>Waiting for a first touch</small>
            </article>
            <article className="dashboard-stat-card">
              <span
                className="dashboard-stat-icon contacted"
                aria-hidden="true"
              >
                ↗
              </span>
              <p>Contacted</p>
              <strong>{contactedLeads}</strong>
              <small>Follow-up started</small>
            </article>
            <article className="dashboard-stat-card">
              <span
                className="dashboard-stat-icon qualified"
                aria-hidden="true"
              >
                ✓
              </span>
              <p>Qualified</p>
              <strong>{qualifiedLeads}</strong>
              <small>Ready for next steps</small>
            </article>
          </section>

          <section className="dashboard-leads-panel" id="leads">
            <div className="dashboard-panel-heading">
              <div>
                <h2>All leads</h2>
                <p>Review applications and keep their status up to date.</p>
              </div>
              <label className="dashboard-search">
                <span aria-hidden="true">⌕</span>
                <input
                  type="search"
                  placeholder="Search leads..."
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  aria-label="Search leads"
                />
                <kbd>/</kbd>
              </label>
            </div>

            <div className="dashboard-filters" aria-label="Filter leads">
              {["All leads", ...statuses].map((filter) => (
                <button
                  type="button"
                  key={filter}
                  className={activeFilter === filter ? "selected" : ""}
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={activeFilter === filter}
                >
                  {filter}
                  {filter === "All leads" && (
                    <span>{leads.length}</span>
                  )}
                </button>
              ))}
            </div>

            {visibleLeads.length ? (
              <div className="dashboard-table-wrap">
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th scope="col">Lead</th>
                      <th scope="col">Brand &amp; role</th>
                      <th scope="col">Profession</th>
                      <th scope="col">Status</th>
                      <th scope="col">Submitted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleLeads.map((lead) => {
                      const detailsOpen = expandedLeadId === lead.id;
                      const details = [
                        ["Name", lead.name],
                        ["Email", lead.email],
                        ["WhatsApp number", lead.phone],
                        ["Brand", lead.brand],
                        ["Role", lead.role],
                        ["Profession / business", lead.profession],
                        ["Instagram / LinkedIn", lead.social],
                        ["Primary expectation", lead.expectations],
                        ["Monthly revenue", lead.revenue],
                        ["Package budget", lead.budget],
                        ["Submitted", formatDate(lead.createdAt)],
                      ];

                      return (
                        <Fragment key={lead.id}>
                          <tr>
                            <td>
                              <div className="dashboard-lead-name">
                                <span className="dashboard-avatar">
                                  {lead.name.charAt(0).toUpperCase()}
                                </span>
                                <span>
                                  <strong>{lead.name}</strong>
                                  <small>{lead.email}</small>
                                  <small>{lead.phone}</small>
                                  <button
                                    type="button"
                                    className="dashboard-view-details"
                                    aria-expanded={detailsOpen}
                                    aria-controls={`lead-details-${lead.id}`}
                                    onClick={() =>
                                      setExpandedLeadId(
                                        detailsOpen ? null : lead.id,
                                      )
                                    }
                                  >
                                    {detailsOpen
                                      ? "Hide form data"
                                      : "View all form data"}
                                  </button>
                                </span>
                              </div>
                            </td>
                            <td>
                              <strong>{lead.brand}</strong>
                              <small className="dashboard-cell-subtext">
                                {lead.role}
                              </small>
                            </td>
                            <td>{lead.profession || "—"}</td>
                            <td>
                              <select
                                className={`dashboard-status-select status-${lead.status
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`}
                                value={lead.status}
                                onChange={(event) =>
                                  changeStatus(lead.id, event.target.value)
                                }
                                aria-label={`Update status for ${lead.name}`}
                              >
                                {statuses.map((status) => (
                                  <option key={status} value={status}>
                                    {status}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="dashboard-date">
                              {formatDate(lead.createdAt)}
                            </td>
                          </tr>
                          {detailsOpen && (
                            <tr className="dashboard-details-row">
                              <td
                                colSpan={5}
                                id={`lead-details-${lead.id}`}
                              >
                                <dl className="dashboard-details-grid">
                                  {details.map(([label, value]) => (
                                    <div key={label}>
                                      <dt>{label}</dt>
                                      <dd>{value || "Not provided"}</dd>
                                    </div>
                                  ))}
                                </dl>
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="dashboard-empty-state">
                <span className="dashboard-empty-icon" aria-hidden="true">
                  ◉
                </span>
                <h3>
                  {leads.length
                    ? "No leads match your search"
                    : "Your lead inbox is ready"}
                </h3>
                <p>
                  {leads.length
                    ? "Try another name, email, or filter."
                    : "New applications submitted on your website will appear here automatically."}
                </p>
                {!leads.length && (
                  <Link to="/" className="dashboard-empty-link">
                    Go to your website <span aria-hidden="true">↗</span>
                  </Link>
                )}
              </div>
            )}
          </section>

          <footer className="dashboard-footer">
            <span>Socialdaa lead dashboard</span>
            <span>Applications are stored locally in this browser.</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
