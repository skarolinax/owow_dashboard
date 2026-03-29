import { useId, useMemo, useState } from 'react';
import '../styles/updates.scss';
import UpdatesSearchBar from '../components/updates/UpdatesSearchBar.jsx';
import UpdateFeedSection from '../components/updates/UpdateFeedSection.jsx';
import NotificationSettingsCard from '../components/updates/NotificationSettingsCard.jsx';
import JiraIntegrationCard from '../components/updates/JiraIntegrationCard.jsx';
import {
  mockJiraIntegration,
  mockNotificationSettings,
} from '../data/mockUpdatesData.js';
import { filterGroupedUpdates, getUpdateFeed } from '../services/updatesService.js';

export default function UpdatesPage() {
  const searchId = useId();
  const [query, setQuery] = useState('');

  const baseFeed = useMemo(() => getUpdateFeed(), []);
  const filtered = useMemo(
    () => filterGroupedUpdates(baseFeed, query),
    [baseFeed, query],
  );

  const hasAny =
    filtered.today.length > 0 ||
    filtered.thisWeek.length > 0 ||
    filtered.earlier.length > 0;

  return (
    <main className="updates-page">
      <div className="updates-layout">
        <div>
          <h1 className="updates-main__title">Update Feed</h1>

          {!hasAny && (
            <p className="updates-empty" role="status">
              No updates match &ldquo;{query}&rdquo;. Try a different search.
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
