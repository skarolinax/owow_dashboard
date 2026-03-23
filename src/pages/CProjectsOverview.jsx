import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function CProjectsOverview() {

  return (
    <>
      <h1>Projects overview</h1>
      <Link to="/grid-dashboard">
        <button>To dashboard</button>
      </Link>
    </>
  )
}

export default CProjectsOverview
