import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import s from "../styles/Clients.module.scss"
import SearchIcon from "../assets/images/search-icon.svg"
import LinkArrow from "../assets/images/arrow-link.svg"

function ClientsOverview() {

  const [selectedLetter, setSelectedLetter] = useState('');
  const alphabet = 'abcdefghijklmnoprstuwyz'.split(''); // Used for the alphabetical filter
  const clients = [ //Hard coded clients data 
    {
      name: "Adidas",
      group: "Sportswear",
      progress: 12,
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

  // Calculate the data to be displayed based on the array
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
  );

  const filteredClients = selectedLetter // Display only the clients whose names start with the letter
    ? clients.filter(client => client.name.toLowerCase().startsWith(selectedLetter))
    : clients;


  return (
    <>
      <div id={s.wrapperClientsPage}>
        <div className={s.headingClientsPage}>
          <h1>Hi OWOW. 👋</h1>
          <h2>Manage and overview your clients in one place.</h2>
        </div>

        <div className={s.sectionCurrentCprojects}>
          <div className={s.currentCprojectsCard}>
            <aside className={`${s.boxCprojectsCard} ${s['boxCprojectsCard--orange']}`}></aside>
            <aside>
              <p>Total clients</p>
              <p>{totalClients}</p>
            </aside>
          </div>
          <div className={s.currentCprojectsCard}>
            <aside className={`${s.boxCprojectsCard} ${s['boxCprojectsCard--green']}`}></aside>
            <aside>
              <p>Active projects</p>
              <p>{totalActiveProjects}/{totalProjects}</p>
            </aside>
          </div>
          <div className={s.currentCprojectsCard}>
            <aside className={`${s.boxCprojectsCard} ${s['boxCprojectsCard--blue']}`}></aside>
            <aside>
              <p>Average progress</p>
              <p>{averageClientProgress}%</p>
            </aside>
          </div>
        </div>

        <div className={s.searchClientOverview}>
          <form>
            <input name="searchbar" id="searchbar" placeholder="Look up company name.." type="search" aria-label="Search clients" />
            <img src={SearchIcon} alt="Search icon" className={s.searchIcon}/>
          </form>
        </div>

        <div className={s.alphabeticalFilter}>
          <button
            key='all'
            onClick={() => setSelectedLetter('')}
            className={selectedLetter === '' ? s.active : ''}
          >
            All
          </button>
          {alphabet.map(letter => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={selectedLetter === letter ? s.active : ''}
            >
              {letter}
            </button>
          ))}
        </div>

        <p className={s.amountIndicator}>Showing {filteredClients.length} of {totalClients}</p>

        <div id={s.wrapperCardsClients}>
          {filteredClients.map(client => (
            <Link
              to="/projects-overview"
              state={{client}}
              key={client.name}
            >
              <div className={s.cardClient} key={client.name}>
                <section className={s.wrapperBtnTopCard}>
                  <div className={s.letterBox}>
                    {client.name.charAt(0)}
                  </div>
                  <img src={LinkArrow} alt="Arrow icon" />
                </section>
                <h3>{client.name}</h3>
                <h4>{client.group}</h4>
                <div className={s.progressBarCPcard}>
                  <p>Progress</p>
                  <p>{client.progress}%</p>
                </div>
                <div className={s.progressBarContainer}>
                  <div style={{width: `${client.progress || 0}%`}}></div>
                </div>
                <div className={s.collectionProjectDescription}>
                  <p>{client.totalProjects} Projects</p>
                  <p>{client.activeProjects} Active</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </>
  )
}

export default ClientsOverview
