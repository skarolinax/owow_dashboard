import { useEffect, useMemo } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import clients from '../data/clients.json'
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import '../styles/budgetstyles.css'
import '../styles/Griddashboard.css'

/**
 * Prefer router state (from project cards). If missing, resolve from ?client=&project= against clients.json.
 */
function resolveClientAndProject(clientsData, location) {
  const { state, search } = location
  if (state?.client && state?.project) {
    return { client: state.client, project: state.project }
  }
  const params = new URLSearchParams(search)
  const clientName = params.get('client')
  const projectName = params.get('project')
  if (clientName && projectName) {
    const client = clientsData.find((c) => c.name === clientName)
    const project = client?.projects.find((p) => p.name === projectName)
    if (client && project) return { client, project }
  }
  return { client: null, project: null }
}

function ClientGridDashboard() {
  const location = useLocation()
  const navigate = useNavigate()
  const [, setSearchParams] = useSearchParams()

  const role = localStorage.getItem("owowRole") || "employee";

  useEffect(() => {
    if (role === 'employee') {
      navigate('/grid-dashboard' + location.search);
    }
  }, [role, navigate, location.search]);

  const { client, project } = useMemo(
    () => resolveClientAndProject(clients, location),
    [location],
  )

  /** After navigation from projects overview, mirror selection in the URL so refresh keeps context. */
  useEffect(() => {
    const st = location.state
    if (!st?.client?.name || !st?.project?.name) return
    const params = new URLSearchParams(location.search)
    if (
      params.get('client') === st.client.name &&
      params.get('project') === st.project.name
    ) {
      return
    }
    setSearchParams(
      { client: st.client.name, project: st.project.name },
      { replace: true },
    )
  }, [location.state, location.search, setSearchParams])

  const clientLabel = client?.name ?? 'Client'
  const projectLabel = project?.name ?? 'Project'

  const projectsOverviewState = client ? { client } : undefined
  const projectPageState = client && project ? { client, project } : undefined

  const goToProjectsOverview = () => {
    navigate('/projects-overview', { state: projectsOverviewState, replace: true })
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
          {clientLabel}
        </button>
        <span className="breadcrumb__sep">{'>'}</span>
        <span className="breadcrumb__current">{projectLabel}</span>
      </nav>

      <div className="budget-top">
        <Link className="btn-back" to="/projects-overview" state={projectsOverviewState}>
          <span className="btn-back__icon" aria-hidden="true">
            ←
          </span>
          <span className="btn-back__text">Back to {clientLabel}</span>
        </Link>
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
               <Link to="/project-status" state={projectPageState} className="view-details">View details →</Link>
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
           {/* Contact Card */}
<div className="card">

  <div className="card-header">
    <h3 className="card-title">📞 Contact OWOW Team</h3>
  </div>

  <div className="contact-summary-card">
    <div className="contact-summary-title">
      <div className="contact-avatar">👨‍💼</div>
      <div className="contact-summary-info">
        <div>
          <span className="contact-name">Project Manager</span>
          <h4 className="contact-person">Sarah Lee</h4>
        </div>
        <span className="contact-email">sarah@owow.com</span>
      </div>
    </div>

    <div className="contact-actions-grid">
      <a href="mailto:sarah@owow.com" className="contact-action-card">
        <span className="contact-action-icon">✉️</span>
        <div>
          <p className="contact-action-title">Email</p>
          <p className="contact-action-text">sarah@owow.com</p>
        </div>
      </a>
      <a href="tel:+31612345678" className="contact-action-card">
        <span className="contact-action-icon">📞</span>
        <div>
          <p className="contact-action-title">Call</p>
          <p className="contact-action-text">+31 6 1234 5678</p>
        </div>
      </a>
      <a href="https://calendly.com/" target="_blank" rel="noreferrer" className="contact-action-card">
        <span className="contact-action-icon">📅</span>
        <div>
          <p className="contact-action-title">Schedule a call</p>
          <p className="contact-action-text">Book time with Sarah</p>
        </div>
      </a>
      <a href="https://slack.com/" target="_blank" rel="noreferrer" className="contact-action-card">
        <span className="contact-action-icon">💬</span>
        <div>
          <p className="contact-action-title">Message on Slack</p>
          <p className="contact-action-text">@sarah_owow</p>
        </div>
      </a>
    </div>
  </div>

</div>
           {/* Milestones Card */}
<div className="card">

  <div className="card-header">
    <h3 className="card-title">🎯 Milestones</h3>
    <Link to="/updates" state={projectPageState} className="view-details">View details →</Link>
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


export default ClientGridDashboard