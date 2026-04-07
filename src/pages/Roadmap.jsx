import { useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import clients from "../data/clients.json";
import "../styles/roadmap.scss";

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

function RoadmapPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { client, project } = useMemo(
    () => resolveClientAndProject(clients, location),
    [location.state, location.search]
  );

  const clientLabel = client?.name ?? "Client";
  const projectLabel = project?.name ?? "Project";

  const projectsOverviewState = client ? { client } : undefined;

  const goToProjectsOverview = () => {
    navigate("/projects-overview", { state: projectsOverviewState });
  };

  return (
    <main>
      <div className="roadmap-page">
        <nav className="breadcrumb" aria-label="Breadcrumb">          <Link className="breadcrumb__link" to="/clients">
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


        <div className="roadmap-content">
          <div className="roadmap-card">
            <div className="roadmap-card__label">Project roadmap</div>

            <div className="roadmap-row roadmap-row--done">
              <div className="roadmap-row__check">
                <div className="check-done">✓</div>
              </div>
              <div className="roadmap-row__info">
                <div className="roadmap-row__title">Project Initialization</div>
                <div className="roadmap-row__due">Due: 15 January 2026</div>
              </div>
              <div className="roadmap-row__status">
                <span className="badge badge--done">Done</span>
              </div>
            </div>

            <div className="roadmap-row roadmap-row--done">
              <div className="roadmap-row__check">
                <div className="check-done">✓</div>
              </div>
              <div className="roadmap-row__info">
                <div className="roadmap-row__title">Design & Architecture</div>
                <div className="roadmap-row__due">Due: 1 February 2026</div>
              </div>
              <div className="roadmap-row__status">
                <span className="badge badge--done">Done</span>
              </div>
            </div>

            <div className="roadmap-row roadmap-row--delayed">
              <div className="roadmap-row__check">
                <div className="check-circle" />
              </div>
              <div className="roadmap-row__info">
                <div className="roadmap-row__title">Core Development</div>
                <div className="roadmap-row__due">Due: 26 February 2026</div>
              </div>
              <div className="roadmap-row__status">
                <span className="badge badge--delayed">In Progress</span>
              </div>
            </div>

            <div className="roadmap-row roadmap-row--pending">
              <div className="roadmap-row__check">
                <div className="check-circle" />
              </div>
              <div className="roadmap-row__info">
                <div className="roadmap-row__title">Testing & QA</div>
                <div className="roadmap-row__due">Due: 20 March 2026</div>
              </div>
              <div className="roadmap-row__status">
                <span className="badge badge--ontime">On time</span>
              </div>
            </div>

            <div className="roadmap-row roadmap-row--pending">
              <div className="roadmap-row__check">
                <div className="check-circle" />
              </div>
              <div className="roadmap-row__info">
                <div className="roadmap-row__title">Deployment</div>
                <div className="roadmap-row__due">Due: 10 April 2026</div>
              </div>
              <div className="roadmap-row__status">
                <span className="badge badge--ontime">On time</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default RoadmapPage;