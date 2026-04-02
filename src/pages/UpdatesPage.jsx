import { useEffect, useId, useMemo, useState } from 'react';
import '../styles/updates.scss';
import UpdatesSearchBar from '../components/updates/UpdatesSearchBar.jsx';
import UpdateFeedSection from '../components/updates/UpdateFeedSection.jsx';
import NotificationSettingsCard from '../components/updates/NotificationSettingsCard.jsx';
import JiraIntegrationCard from '../components/updates/JiraIntegrationCard.jsx';
import {
  mockJiraIntegration,
  mockNotificationSettings,
} from '../data/mockUpdatesData.js';
import {
  emptyGroupedUpdates,
  filterGroupedUpdates,
  groupedUpdatesSignature,
  loadSlackGroupedUpdates,
} from '../services/updatesService.js';
import Breadcrumbs from '../components/Breadcrumbs.jsx';

const POLL_INTERVAL_MS = 12_000;

export default function UpdatesPage() {
  const searchId = useId();
  const [query, setQuery] = useState('');
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
    [grouped, query],
  );

  const hasAny =
    filtered.today.length > 0 ||
    filtered.thisWeek.length > 0 ||
    filtered.earlier.length > 0;

  return (
    <main className="updates-page">
      <Breadcrumbs />
      <div className="updates-layout">
        <div>
          <h1 className="updates-main__title">Update Feed</h1>

          {loading && (
            <p className="updates-status" role="status" aria-live="polite">
              Loading updates…
            </p>
          )}

          {loadError && (
            <p className="updates-status updates-status--error" role="alert">
              Couldn&apos;t load Slack updates. Showing an empty feed; check the connection
              and try refreshing the page.
            </p>
          )}

          {!loading && !hasAny && (
            <p className="updates-empty" role="status">
              {query.trim()
                ? `No updates match “${query}”. Try a different search.`
                : loadError
                  ? 'No updates to display.'
                  : 'No updates yet. Post in the connected Slack channel to see them here.'}
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
