import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'


function GridDashboard() {
  const location = useLocation();
  const project = location.state?.project;
  const client = location.state?.client; 

  const navigate = useNavigate();

  if (!project) return <p>No project data found</p>

  return (
    <>

    <button onClick={() => navigate(-1)}>Go back to {client.name}</button>
    <h1>{project.name}</h1>

      
    </>
  )
}

export default GridDashboard
