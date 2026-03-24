import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function ClientsOverview() {

  const alphabet = 'abcdefghijklmnoprstuwyz'.split(''); // Used for the alphabetical filter
  const clients = [ //Hard coded clients data 
    {
      name: "Adidas",
      group: "Sportswear",
      progress: 72,
      totalProjects: 6,
      activeProjects: 2,
    },
    {
      name: "Nike",
      group: "Sport",
      progress: 85,
      totalProjects: 8,
      activeProjects: 3,
    },
    {
      name: "Apple",
      group: "Technology",
      progress: 64,
      totalProjects: 7,
      activeProjects: 4,
    },
    {
      name: "BMW",
      group: "Automotive",
      progress: 91,
      totalProjects: 5,
      activeProjects: 1,
    },
    {
      name: "Coca-Cola",
      group: "Beverage",
      progress: 58,
      totalProjects: 6,
      activeProjects: 2,
    },
    {
      name: "Dell",
      group: "Technology",
      progress: 77,
      totalProjects: 4,
      activeProjects: 1,
    },
    {
      name: "Ebay",
      group: "E-commerce",
      progress: 69,
      totalProjects: 5,
      activeProjects: 2,
    },
    {
      name: "Ford",
      group: "Automotive",
      progress: 80,
      totalProjects: 7,
      activeProjects: 3,
    },
    {
      name: "Google",
      group: "Technology",
      progress: 88,
      totalProjects: 9,
      activeProjects: 5,
    },
    {
      name: "H&M",
      group: "Retail",
      progress: 55,
      totalProjects: 4,
      activeProjects: 1,
    },
    {
      name: "Intel",
      group: "Technology",
      progress: 73,
      totalProjects: 6,
      activeProjects: 2,
    },
    {
      name: "IKEA",
      group: "Furniture",
      progress: 66,
      totalProjects: 5,
      activeProjects: 2,
    },
  ];

  const totalClients = clients.length;

  const totalActiveProjects = clients.reduce(
    (sum, client) => sum + client.activeProjects,
    0
  );
  const totalProjects = clients.reduce(
    (sum, client) => sum + client.totalProjects,
    0
  );

  const averageClientProgress = Math.round(clients.reduce(
      (sum, client) =>  sum + client.progress, 0) / totalClients
    )


  return (
    
    <>
      <div id="wrapper-clients-page">
        <div className="heading-clients-page">
          <h1>Hi OWOW. 👋</h1>
          <h2>Manage and overview your clients in one place.</h2>
        </div>

        <div className="section-current-cprojects">
          <div className="current-cprojects-card">
            <p>Total clients</p>
            <p>{totalClients}</p>
          </div>
          <div className="current-cprojects-card">
            <p>Active projects</p>
            <p>{totalActiveProjects}/{totalProjects}</p>
          </div>
          <div className="current-cprojects-card">
            <p>Average progress</p>
            <p>{averageClientProgress}%</p>
          </div>
        </div>

        <div className="search-client-overview">
          <form>
            <input name="searchbar" id="searchbar" placeholder="Look up company name.." />
          </form>
        </div>

        {alphabet.map(letter => (
          <div className="alphabetical-filter" key={letter}>
            <button>{letter}</button>
          </div>
        ))}

        <p>Showing .. of {totalClients}</p>

        {clients.map(client => (
          <div className="card-client">
            <h3>{client.name}</h3>
            <h3>{client.group}</h3>
            <h3>{client.progress}</h3>
            <h3>{client.totalProjects}</h3>
            <h3>{client.activeProjects}</h3>
          </div>
        ))
      }
      </div>

       <Link to="/projects-overview">
        <button>Projects Overview</button>
      </Link>
    </>
  )
}

export default ClientsOverview
