import { useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import clients from "../data/clients.json";
import "../styles/RisksPage.css";
import "../styles/budgetstyles.css";

/**
 * Supports:
 * 1. router state: { client, project }
 * 2. query params: ?client=Tesla&project=Dashboard%20Redesign
 * 3. fallback labels if neither exists yet
 */
function resolveClientAndProject(clientsData, location) {
  const { state, search } = location;

  if (state?.client && state?.project) {
    return { client: state.client, project: state.project };
  }

  const params = new URLSearchParams(search);
  const clientName = params.get("client");
  const projectName = params.get("project");

  if (clientName && projectName) {
    const client = clientsData.find((c) => c.name === clientName);
    const project = client?.projects?.find((p) => p.name === projectName);

    if (client && project) {
      return { client, project };
    }
  }

  return { client: null, project: null };
}

function RisksPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { client, project } = useMemo(
    () => resolveClientAndProject(clients, location),
    [location]
  );

  const clientLabel = client?.name ?? "Client";
  const projectLabel = project?.name ?? "Project";

  const projectsOverviewState = client ? { client } : undefined;

  const goToProjectsOverview = () => {
    navigate("/projects-overview", { state: projectsOverviewState });
  };

  const risks = [
    {
      id: 1,
      name: "Designer approval delay",
      description: "Waiting for client feedback on new UI mockups",
      impact: "medium",
      status: "at-risk",
    },
    {
      id: 2,
      name: "API rate limit",
      description: "Possible traffic issues during launch",
      impact: "low",
      status: "monitoring",
    },
  ];

  const atRiskCount = risks.filter((r) => r.status === "at-risk").length;
  const monitoringCount = risks.filter((r) => r.status === "monitoring").length;
  const resolvedCount = risks.filter((r) => r.status === "resolved").length;
  const mediumRisks = risks.filter((r) => r.impact === "medium");
  const lowRisks = risks.filter((r) => r.impact === "low");

  return (
    <div className="risks-page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link className="breadcrumb__link" to="/clients">
          Clients
        </Link>

        <span className="breadcrumb__sep">{">"}</span>

        <button
          className="breadcrumb__link"
          type="button"
          onClick={goToProjectsOverview}
        >
          {clientLabel}
        </button>

        <span className="breadcrumb__sep">{">"}</span>

        <span className="breadcrumb__current">{projectLabel}</span>
      </nav>

      <div className="budget-top">
        {/* <button className="btn-back" type="button" onClick={goToProjectsOverview}>
          <span className="btn-back__icon" aria-hidden="true">
            ←
          </span>
          <span className="btn-back__text">Back to {clientLabel}</span>
        </button> */}
      </div>

      <div className="risks-content">
        <div className="risks-header">
          <div className="risks-title-row">
            <span className="risks-icon">⚠️</span>
            <div>
              <h1 className="risks-title">Risks</h1>
              <p className="risks-subtitle">{projectLabel}</p>
            </div>
          </div>
        </div>

        <div className="card summary-card">
          <div className="summary-left">
            <div className="donut-chart">
              <div className="donut-inner">
                <span className="donut-number">{risks.length}</span>
                <span className="donut-label">Total Risks</span>
              </div>
            </div>
          </div>

          <div className="summary-right">
            <div className="impact-row">
              <div className="impact-info">
                <span className="impact-name">High impact</span>
                <span className="impact-desc">Could seriously affect the project</span>
              </div>
              <span className="impact-count high">0</span>
            </div>

            <div className="impact-row">
              <div className="impact-info">
                <span className="impact-name">Medium impact</span>
                <span className="impact-desc">Manageable with attention</span>
              </div>
              <span className="impact-count medium">{mediumRisks.length}</span>
            </div>

            <div className="impact-row">
              <div className="impact-info">
                <span className="impact-name">Low impact</span>
                <span className="impact-desc">Minor issues with low likelihood</span>
              </div>
              <span className="impact-count low">{lowRisks.length}</span>
            </div>
          </div>
        </div>

        <div className="status-boxes">
          <div className="status-box at-risk">
            <span className="status-box-label">At Risk</span>
            <span className="status-box-count">{atRiskCount}</span>
          </div>

          <div className="status-box monitoring">
            <span className="status-box-label">Monitoring</span>
            <span className="status-box-count">{monitoringCount}</span>
          </div>

          <div className="status-box resolved">
            <span className="status-box-label">Resolved</span>
            <span className="status-box-count">{resolvedCount}</span>
          </div>
        </div>

        {mediumRisks.length > 0 && (
          <div className="risk-group">
            <div className="risk-group-header">
              <span className="risk-group-icon">⚠️</span>
              <h3 className="risk-group-title">Medium Impact</h3>
              <span className="risk-group-count">{mediumRisks.length}</span>
            </div>

            {mediumRisks.map((risk) => (
              <div key={risk.id} className="risk-card medium">
                <div className="risk-card-top">
                  <span className="risk-card-name">{risk.name}</span>
                  <span className={`risk-card-tag ${risk.status}`}>{risk.status}</span>
                </div>
                <p className="risk-card-desc">{risk.description}</p>
                <p className="risk-card-impact">• Impact: {risk.impact}</p>
              </div>
            ))}
          </div>
        )}

        {lowRisks.length > 0 && (
          <div className="risk-group">
            <div className="risk-group-header">
              <span className="risk-group-icon">ℹ️</span>
              <h3 className="risk-group-title">Low Impact</h3>
              <span className="risk-group-count">{lowRisks.length}</span>
            </div>

            {lowRisks.map((risk) => (
              <div key={risk.id} className="risk-card low">
                <div className="risk-card-top">
                  <span className="risk-card-name">{risk.name}</span>
                  <span className={`risk-card-tag ${risk.status}`}>{risk.status}</span>
                </div>
                <p className="risk-card-desc">{risk.description}</p>
                <p className="risk-card-impact">• Impact: {risk.impact}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RisksPage;