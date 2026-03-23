import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function ClientsOverview() {

  return (
    <>
      <h1>Clients overview</h1>
       <Link to="/projects-overview">
        <button>Projects Overview</button>
      </Link>
    </>
  )
}

export default ClientsOverview
