import { useId } from 'react';

const STATUS_MAP = {
  inReview: { label: 'In Review', tone: 'info' },
  done: { label: 'Done', tone: 'success' },
  inProgress: { label: 'In Progress', tone: 'warn' },
};

function JiraGlyph() {
  const gradId = `jira-grad-${useId().replace(/:/g, '')}`;
  return (
    <span className="integration-icon integration-icon--jira" aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#2684FF"
          d="M12.294 11.973 7.32 6.998a1.012 1.012 0 0 0-1.43 0L1 11.89l5.294 5.294a1.01 1.01 0 0 0 1.43 0l5.57-5.211Z"
        />
        <path
          fill={`url(#${gradId})`}
          d="m12.294 12.027 4.974-4.975a1.012 1.012 0 0 1 1.43 0L23 12.354l-5.294 5.294a1.01 1.01 0 0 1-1.43 0l-4.982-4.621Z"
        />
        <defs>
          <linearGradient id={gradId} x1="12.29" x2="23" y1="7.05" y2="17.65" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2684FF" />
            <stop offset="1" stopColor="#0052CC" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}

/**
 * @param {Object} props
 * @param {import('../../types/updates.types.js').JiraIntegrationSummary} props.data
 */
export default function JiraIntegrationCard({ data }) {
  return (
    <section className="side-card" aria-labelledby="jira-integration-title">
      <h2 id="jira-integration-title" className="side-card__title">
        Jira Integration
      </h2>

      <div className="side-card__block">
        <div className="side-card__integration">
          <JiraGlyph />
          <div>
            <p className="side-card__strong">Connected to Jira</p>
            <p className="side-card__muted">Project: {data.projectName}</p>
          </div>
        </div>
      </div>

      <h3 className="side-card__subtitle">Recent Jira activity</h3>
      <ul className="jira-activity-list">
        {data.recentActivity.map((row) => {
          const meta = STATUS_MAP[row.status];
          return (
            <li key={row.key} className="jira-activity-item">
              <a className="jira-activity-item__key" href="#">
                {row.key}
              </a>
              <span className="jira-activity-item__title">{row.title}</span>
              <span className={`jira-badge jira-badge--${meta.tone}`}>{meta.label}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
