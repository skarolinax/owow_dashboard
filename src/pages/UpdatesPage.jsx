import { useEffect, useId, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import clients from "../data/clients.json";
import "../styles/updates.scss";
import "../styles/budgetstyles.css";
import UpdatesSearchBar from "../components/updates/UpdatesSearchBar.jsx";
import UpdateFeedSection from "../components/updates/UpdateFeedSection.jsx";
import NotificationSettingsCard from "../components/updates/NotificationSettingsCard.jsx";
import JiraIntegrationCard from "../components/updates/JiraIntegrationCard.jsx";
import {
  mockJiraIntegration,
  mockNotificationSettings,
} from "../data/mockUpdatesData.js";
import {
  emptyGroupedUpdates,
  filterGroupedUpdates,
  groupedUpdatesSignature,
  loadSlackGroupedUpdates,
} from "../services/updatesService.js";

const POLL_INTERVAL_MS = 12_000;

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

export default function UpdatesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchId = useId();

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

  const [query, setQuery] = useState("");
  const [grouped, setGrouped] = useState(emptyGroupedUpdates);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadFeed(isInitial) {
      if (isInitial) {
        setLoading(true);
        setLoadError(false);
      }

      try {
        const next = await loadSlackGroupedUpdates();
        if (cancelled) return;

        setGrouped((prev) => {
          if (groupedUpdatesSignature(prev) === groupedUpdatesSignature(next)) {
            return prev;
          }
          return next;
        });

        setLoadError(false);
      } catch {
        if (cancelled) return;
        setLoadError(true);

        if (isInitial) {
          setGrouped(emptyGroupedUpdates());
        }
      } finally {
        if (!cancelled && isInitial) {
          setLoading(false);
        }
      }
    }

    void loadFeed(true);
    const intervalId = setInterval(() => void loadFeed(false), POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(intervalId);
    };
  }, []);

  const filtered = useMemo(
    () => filterGroupedUpdates(grouped, query),
    [grouped, query]
  );

  const hasAny =
    filtered.today.length > 0 ||
    filtered.thisWeek.length > 0 ||
    filtered.earlier.length > 0;

  return (
    <main className="updates-page">
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
        <button className="btn-back" type="button" onClick={goToProjectsOverview}>
          <span className="btn-back__icon" aria-hidden="true">
            ←
          </span>
          <span className="btn-back__text">Back to {clientLabel}</span>
        </button>
      </div>

      <div className="updates-layout">
        <div>
          <h1 className="updates-main__title">Update Feed</h1>
          <p
            style={{
              marginTop: "-4px",
              marginBottom: "16px",
              color: "var(--color-text-secondary, #7A7A81)",
              fontFamily: "MontrealMono",
              fontSize: "13px",
            }}
          >
            {projectLabel}
          </p>

          {loading && (
            <p className="updates-status" role="status" aria-live="polite">
              Loading updates…
            </p>
          )}

          {loadError && (
            <p className="updates-status updates-status--error" role="alert">
              Couldn&apos;t load Slack updates. Showing an empty feed; check the
              connection and try refreshing the page.
            </p>
          )}

          {!loading && !hasAny && (
            <p className="updates-empty" role="status">
              {query.trim()
                ? `No updates match “${query}”. Try a different search.`
                : loadError
                  ? "No updates to display."
                  : "No updates yet. Post in the connected Slack channel to see them here."}
            </p>
          )}

          <UpdateFeedSection sectionKey="today" items={filtered.today} />
          <UpdateFeedSection sectionKey="thisWeek" items={filtered.thisWeek} />
          <UpdateFeedSection sectionKey="earlier" items={filtered.earlier} />
        </div>

        <aside className="updates-sidebar" aria-label="Updates tools">
          <UpdatesSearchBar
            id={`${searchId}-updates-search`}
            value={query}
            onChange={setQuery}
            placeholder="Search for updates..."
          />
          <NotificationSettingsCard settings={mockNotificationSettings} />
          <JiraIntegrationCard data={mockJiraIntegration} />
        </aside>
      </div>
    </main>
  );
}