export default function RoadmapRow({ title, due, status, done }) {
    return (
        <div className={`roadmap-row ${done ? 'roadmap-row--done' : ''}`}>
            <div className="roadmap-row__check">
                {done ? <div className="check-done">✓</div> : <div className="check-circle" />}
            </div>
            <div className="roadmap-row__info">
                <div className="roadmap-row__title">{title}</div>
                <div className="roadmap-row__due">Due: {due}</div>
            </div>
            <div className="roadmap-row__status">
                <Badge status={status} />
            </div>
        </div>
    )
}