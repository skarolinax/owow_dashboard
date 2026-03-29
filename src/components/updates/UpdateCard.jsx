import { Link } from 'react-router-dom';

function IconExternalLink() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 3h7v7M10 14 21 3M21 14v7H3V3h7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UpdateActionLink({ href, label }) {
  const content = (
    <>
      <span>{label}</span>
      <IconExternalLink />
    </>
  );

  if (href.startsWith('/')) {
    return (
      <Link className="update-card__action" to={href}>
        {content}
      </Link>
    );
  }

  const isHttp = /^https?:\/\//i.test(href);
  return (
    <a
      className="update-card__action"
      href={href}
      {...(isHttp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {content}
    </a>
  );
}

/**
 * @param {Object} props
 * @param {import('../../types/updates.types.js').UpdateFeedItem} props.item
 */
export default function UpdateCard({ item }) {
  const href = item.actionUrl || '#';

  return (
    <article className="update-card">
      <div className="update-card__status" aria-hidden="true" />
      <div className="update-card__body">
        <h3 className="update-card__title">{item.title}</h3>
        <p className="update-card__preview">&ldquo;{item.preview}&rdquo;</p>
      </div>
      <div className="update-card__aside">
        <div className="update-card__top">
          <time className="update-card__time" dateTime={item.isoTimestamp}>
            {item.relativeTime}
          </time>
          <button
            type="button"
            className="update-card__menu"
            aria-label={`More actions for ${item.title}`}
          >
            <span aria-hidden="true">⋯</span>
          </button>
        </div>
        <UpdateActionLink href={href} label={item.actionLabel} />
      </div>
    </article>
  );
}
