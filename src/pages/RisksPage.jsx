import { Link, useNavigate } from 'react-router-dom'
import '../styles/RisksPage.css'

function RisksPage() {
  const navigate = useNavigate();

  const risks = [
    {
      id: 1,
      name: 'Designer approval delay',
      description: 'Waiting for client feedback on new UI mockups',
      impact: 'medium',
      status: 'at-risk',
    },
    {
      id: 2,
      name: 'API rate limit',
      description: 'Possible traffic issues during launch',
      impact: 'low',
      status: 'monitoring',
    },
  ]

  const atRiskCount     = risks.filter(r => r.status === 'at-risk').length
  const monitoringCount = risks.filter(r => r.status === 'monitoring').length
  const resolvedCount   = risks.filter(r => r.status === 'resolved').length

  const mediumRisks = risks.filter(r => r.impact === 'medium')
  const lowRisks    = risks.filter(r => r.impact === 'low')

  const goToProjectsOverview = () => {
    navigate('/projects-overview')
  }
  
  return (
    <div className="budget-page">
      <div className="budget-top">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link className="breadcrumb__link" to="/clients">
            Clients
          </Link>
          <span className="breadcrumb__sep">{'>'}</span>
          <button className="breadcrumb__link" type="button" onClick={goToProjectsOverview}>
            Nike
          </button>
          <span className="breadcrumb__sep">{'>'}</span>
          <span className="breadcrumb__current">Dashboard Redesign</span>
        </nav>

        <button className="btn-back" type="button" onClick={goToProjectsOverview}>
          <span className="btn-back__icon" aria-hidden="true">
            ←
          </span>
          <span className="btn-back__text">Back to Nike</span>
        </button>
      </div>


     {/* Summary Card */}
<div className="card summary-card">

  {/* Left side - donut chart */}
  <div className="summary-left">
    <div className="donut-chart">
      <div className="donut-inner">
        <span className="donut-number">{risks.length}</span>
        <span className="donut-label">Total Risks</span>
      </div>
    </div>
  </div>

  {/* Right side - impact breakdown */}
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

{/* Three status boxes */}
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
     {/* Medium Impact Group */}
{mediumRisks.length > 0 && (
  <div className="risk-group">
    <div className="risk-group-header">
      <span className="risk-group-icon">⚠️</span>
      <h3 className="risk-group-title">Medium Impact</h3>
      <span className="risk-group-count">{mediumRisks.length}</span>
    </div>

    {mediumRisks.map(risk => (
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

{/* Low Impact Group */}
{lowRisks.length > 0 && (
  <div className="risk-group">
    <div className="risk-group-header">
      <span className="risk-group-icon">ℹ️</span>
      <h3 className="risk-group-title">Low Impact</h3>
      <span className="risk-group-count">{lowRisks.length}</span>
    </div>

    {lowRisks.map(risk => (
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
  )
}

export default RisksPage