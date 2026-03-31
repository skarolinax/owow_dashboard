import { Link, useNavigate } from 'react-router-dom'
import '../styles/budgetstyles.css'
import '../styles/Griddashboard.css'

function GridDashboard() {
  const navigate = useNavigate()

  const goToProjectsOverview = () => {
    navigate('/projects-overview')
  }

   // This is our task data - in a real app this would come from a database
  const tasks = [
    { id: 1, name: 'Send wireframe',    status: 'Done',     due: '18 March 2026' },
    { id: 2, name: 'Complete the plan', status: 'Done',     due: '20 March 2026' },
    { id: 3, name: 'Prototype',         status: 'Delayed',  due: '30 March 2026' },
    { id: 4, name: 'Deploy',            status: 'On-time',  due: '31 March 2026' },
  ]

  return (


    <div className="project-view">
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

      <div className="budget-top">
        <button className="btn-back" type="button" onClick={goToProjectsOverview}>
          <span className="btn-back__icon" aria-hidden="true">
            ←
          </span>
          <span className="btn-back__text">Back to Nike</span>
        </button>
      </div>

      <div className="page-content">
        <h1 className="page-title">Good morning, OWOW.</h1>

        <div className="page-layout">

          {/* Left column */}
          <div className="left-column">

            {/* Status Card */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">📊 Status</h3>
               <Link to="/project-status" className="view-details">View details →</Link>
              </div>
              <div className="progress-section">
                <div className="progress-top">
                  <span>Overall progress</span>
                  <span>52%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: '52%' }}></div>
                </div>
              </div>
              <div className="status-stats">
                <div className="stat-box">
                  <span className="stat-label">Status</span>
                  <span className="stat-value">In Progress</span>
                </div>
                <div className="stat-box">
                  <span className="stat-label">Due Date</span>
                  <span className="stat-value">05/2026</span>
                </div>
                <div className="stat-box">
                  <span className="stat-label">Team</span>
                  <span className="stat-value">8 members</span>
                </div>
                <div className="stat-box">
                  <span className="stat-label">Days Left</span>
                  <span className="stat-value">70</span>
                </div>
              </div>
            </div>

            {/* Placeholder cards for now */}
           {/* Roadmap Card */}
<div className="card">

  <div className="card-header">
    <h3 className="card-title">📋 Project Roadmap</h3>
     <Link to="/roadmap" className="view-details">View details →</Link>
  </div>

  {/* Completed / Remaining / Total count */}
  <div className="roadmap-counts">
    <span className="count-done">Completed: 2</span>
    <span className="count-remaining">Remaining: 2</span>
    <span className="count-total">Total: 4</span>
  </div>

  {/* Task list - .map() loops through each task and creates a row */}
  <div className="task-list">
    {tasks.map(task => (
      <div key={task.id} className="task-row">

        {/* Circle icon - filled if done */}
        <span className={task.status === 'Done' ? 'task-icon done' : 'task-icon'}>
          {task.status === 'Done' ? '✓' : '○'}
        </span>

        {/* Task name - strikethrough if done */}
        <span className={task.status === 'Done' ? 'task-name done' : 'task-name'}>
          {task.name}
        </span>

        {/* Status badge */}
        <span className={`task-badge ${task.status.toLowerCase()}`}>
          {task.status}
        </span>

        {/* Due date */}
        <span className="task-due">Due {task.due}</span>

      </div>
    ))}
  </div>

</div>


            {/* Files Card */}
<div className="card">

  <div className="card-header">
    <h3 className="card-title">📁 Files</h3>
  </div>

  {/* File thumbnails in a row */}
  <div className="files-grid">

    <div className="file-item">
      <div className="file-icon">📄</div>
      <p className="file-name">contract.pdf</p>
    </div>

    <div className="file-item">
      <div className="file-icon">📄</div>
      <p className="file-name">requirements.pdf</p>
    </div>

  </div>

</div>

          </div>

          {/* Right column */}
          <div className="right-column">
           {/* Budget Card */}
<div className="card">

  <div className="card-header">
    <h3 className="card-title">💰 Budget</h3>
    <Link to="/budget" className="view-details">View details →</Link>
  </div>

  {/* Total budget amount */}
  <p className="budget-label">Total budget</p>
  <p className="budget-total">$125,000</p>

  {/* Spent progress bar */}
  <div className="budget-bar-row">
    <span className="budget-bar-label">Spent</span>
    <span className="budget-bar-percent">19%</span>
  </div>
  <div className="progress-bar-bg">
    <div className="progress-bar-fill orange" style={{ width: '19%' }}></div>
  </div>

  {/* Spent vs Remaining boxes */}
  <div className="budget-boxes">
    <div className="budget-box">
      <p className="budget-box-label">Spent</p>
      <p className="budget-box-value">$24k</p>
    </div>
    <div className="budget-box">
      <p className="budget-box-label">Remaining</p>
      <p className="budget-box-value">$101k</p>
    </div>
  </div>

  {/* Hours row */}
  <div className="budget-hours">
    <span className="budget-box-label">⏱ Hours</span>
    <span className="budget-box-label">50h / 100h</span>
  </div>

</div>
            {/* Risks Card */}
<div className="card">

  <div className="card-header">
    <h3 className="card-title">⚠️ Risks</h3>
   <Link to="/risks" className="view-details">View details →</Link>
  </div>

  {/* Severity summary badges */}
  <div className="risk-summary">
    <span className="risk-severity medium">1 Medium</span>
    <span className="risk-severity low">1 Low</span>
  </div>

  {/* Risk items */}
  <div className="risk-list">

    <div className="risk-item">
      <div className="risk-item-top">
        <span className="risk-name">Designer approval delay</span>
        <span className="risk-tag at-risk">at-risk</span>
      </div>
      <p className="risk-desc">Waiting for client feedback on new UI mockups</p>
    </div>

    <div className="risk-item">
      <div className="risk-item-top">
        <span className="risk-name">API rate limit</span>
        <span className="risk-tag monitoring">monitoring</span>
      </div>
      <p className="risk-desc">Possible traffic issues during launch</p>
    </div>

  </div>

  <p className="risk-total">Total: 2</p>

</div>
           {/* Milestones Card */}
<div className="card">

  <div className="card-header">
    <h3 className="card-title">🎯 Milestones</h3>
    <Link to="/updates" className="view-details">View details →</Link>
  </div>

  <div className="milestone-list">

    <div className="milestone-item">
      <span className="milestone-number">1</span>
      <div className="milestone-info">
        <p className="milestone-name">Project kick-off</p>
        <p className="milestone-date">1 February 2026</p>
      </div>
      <span className="milestone-tag completed">Completed</span>
    </div>

    <div className="milestone-item">
      <span className="milestone-number">2</span>
      <div className="milestone-info">
        <p className="milestone-name">Prototyping</p>
        <p className="milestone-date">5 February 2026</p>
      </div>
      <span className="milestone-tag completed">Completed</span>
    </div>

    <div className="milestone-item">
      <span className="milestone-number">3</span>
      <div className="milestone-info">
        <p className="milestone-name">Development</p>
        <p className="milestone-date">28 February 2026</p>
      </div>
      <span className="milestone-tag in-progress">In Progress</span>
    </div>

  </div>

  <p className="milestone-footer">2 of 4 completed</p>

</div>
          </div>

        </div>
      </div>
    </div>
  )
}


export default GridDashboard
