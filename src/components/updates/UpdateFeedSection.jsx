import UpdateCard from './UpdateCard.jsx';

const SECTION_LABELS = {
  today: 'Today',
  thisWeek: 'This week',
  earlier: 'Earlier',
};

/**
 * @param {Object} props
 * @param {'today' | 'thisWeek' | 'earlier'} props.sectionKey
 * @param {import('../../types/updates.types.js').UpdateFeedItem[]} props.items
 */
export default function UpdateFeedSection({ sectionKey, items }) {
  if (!items.length) return null;

  return (
    <section className="update-feed-section" aria-labelledby={`feed-${sectionKey}`}>
      <div className="update-feed-section__header">
        <span className="update-feed-section__marker" aria-hidden="true" />
        <h2 id={`feed-${sectionKey}`} className="update-feed-section__title">
          {SECTION_LABELS[sectionKey]}
        </h2>
      </div>
      <div className="update-feed-section__timeline">
        <ul className="update-feed-section__list">
          {items.map((item) => (
            <li key={item.id}>
              <UpdateCard item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
