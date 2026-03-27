import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import s from "../styles/Clients.module.scss"

function CProjectsOverview() {
  const location = useLocation();
  const client = location.state?.client;

  const navigate = useNavigate();

  if (!client) return <p>No projects data found</p>

  const activeClientProjects = client.projects.filter(
    project => project.status === "Active"
  ).length;

  // const averageProjectsProgress =
  // const budgetUsed = 

  return (
    <>

      <div className={s.wrapperAllProjects}>
        <button onClick={() => navigate(-1)}>Back to all clients</button>
        <div className={s.headingProjectsPage}>
          <div className={s.letterBox}>
            {client.name.charAt(0)}
          </div>
          <div>
            <h1>{client.name}</h1>
            <p>{client.group} Group</p>
          </div>
        </div>

        <p>Total {client.projects.length}</p>
        <p>Active {activeClientProjects}</p>
        <p>Average progress {}</p>
        <p>Budget used {}</p>

        <h3>Projects Overview</h3>
        <div className={s.wrapperCardProject}>
          {client.projects.map(project => (
            <Link
              to="/grid-dashboard"
              state={{project, client}}
              key={project.name}
            >
              <div className={s.cardProjectSpecific}>
                <p>{project.name}</p>
                <p>{project.description}</p>
                <p>{project.team} team members</p>
                <p>{project.risks} Risks</p>
                <p>{project.status} status</p>
                <p>{project.budget}% Budget Used</p>
                <p>{project.progress}% Average Progress</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </>
  )
}

export default CProjectsOverview
