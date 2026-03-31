import { useId, useState } from 'react';

function SlackGlyph() {
  return (
    <span className="integration-icon integration-icon--slack" aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill="#E01E5A" d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" />
        <path fill="#36C5F0" d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.522A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" />
        <path fill="#2EB67D" d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.528 2.528 0 0 1-2.521-2.521V2.522A2.528 2.528 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" />
        <path fill="#ECB22E" d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.521-2.522v-2.522h2.521zM15.165 17.688a2.527 2.527 0 0 1-2.521-2.523 2.528 2.528 0 0 1 2.521-2.521h6.313A2.528 2.528 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
      </svg>
    </span>
  );
}

function ToggleRow({ label, checked, onChange, id }) {
  return (
    <div className="settings-toggle-row">
      <span id={`${id}-label`} className="settings-toggle-row__label">
        {label}
      </span>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={`${id}-label`}
        className={`settings-toggle${checked ? ' settings-toggle--on' : ''}`}
        onClick={() => onChange(!checked)}
      >
        <span className="settings-toggle__thumb" />
      </button>
    </div>
  );
}

/**
 * @param {Object} props
 * @param {import('../../types/updates.types.js').NotificationSettings} props.settings
 */
export default function NotificationSettingsCard({ settings: initial }) {
  const baseId = useId();
  const [email, setEmail] = useState(initial.emailNotifications);
  const [weekly, setWeekly] = useState(initial.weeklyDigest);
  const [important, setImportant] = useState(initial.importantOnly);

  return (
    <section className="side-card" aria-labelledby={`${baseId}-notifications-title`}>
      <h2 id={`${baseId}-notifications-title`} className="side-card__title">
        Notification settings
      </h2>

      <div className="side-card__block">
        <div className="side-card__integration">
          <SlackGlyph />
          <div>
            <p className="side-card__strong">Connected to Slack</p>
            <p className="side-card__muted">Workspace: {initial.workspaceLabel}</p>
            <p className="side-card__muted">
              Channel:{' '}
              <span className="side-card__channel">{initial.channelLabel}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="side-card__toggles">
        <ToggleRow
          id={`${baseId}-email`}
          label="Email notifications"
          checked={email}
          onChange={setEmail}
        />
        <ToggleRow
          id={`${baseId}-weekly`}
          label="Weekly digest"
          checked={weekly}
          onChange={setWeekly}
        />
        <ToggleRow
          id={`${baseId}-important`}
          label="Important updates only"
          checked={important}
          onChange={setImportant}
        />
      </div>
    </section>
  );
}
