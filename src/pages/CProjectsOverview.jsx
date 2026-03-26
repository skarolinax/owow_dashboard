import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import s from "../styles/Clients.module.scss"

function CProjectsOverview() {
  const location = useLocation();
  const client = location.state?.client;

  const navigate = useNavigate();

  if (!client) return <p>No project data found</p>

  return (
    <>

      <button onClick={() => navigate(-1)}>Back to all clients</button>
      <div className="sth">
        <h1>{client.name}</h1>
        <p>{client.group} Group</p>
      </div>

      <h3>Projects Overview</h3>

      {client.projects.map(project => (
        <Link 
          to="/grid-dashboard"
          state={{project}}
          key={project.name}
        >
          <div className={s.cardProjectSpecific}>
            <p>{project.name}</p>
            <p>{project.description}</p>
            <p>{project.team} team members</p>
            <p>{project.risks} Risks</p>
            <p>{project.status} Active</p>
            <p>{project.budget} Budget Used</p>
            <p>{project.progress} Average Progress</p>
          </div>

        </Link>

      ))}

    </>
  )
}

export default CProjectsOverview
