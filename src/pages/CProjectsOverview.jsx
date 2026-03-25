import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function CProjectsOverview() {
  const location = useLocation();
  const client = location.state?.client;

  if (!client) return <p>No project data found</p>
  return (
    <>
      <h1>Projects overview</h1>

      <h1>{client.name}</h1>
      <p>{client.group} Group</p>
      <p>{client.totalProjects} projects</p>
      <Link to="/grid-dashboard">
        <button>To dashboard</button>
      </Link>
    </>
  )
}

export default CProjectsOverview
