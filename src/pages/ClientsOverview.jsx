import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import s from "../styles/Clients.module.scss"
import SearchIcon from "../assets/images/search-icon.svg"
import LinkArrow from "../assets/images/arrow-link.svg"
import clients from "../data/clients.json"

function ClientsOverview() {

  const [selectedLetter, setSelectedLetter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const alphabet = 'abcdefghijklmnoprstuwyz'.split(''); // Used for the alphabetical filter
  const [visibleClient, setVisibleClient] = useState(8);
  
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

  // Filter either by searchbar or alphabet filter 
  const filteredClients = clients.filter(client => {
    if (selectedLetter){
      return client.name
      .toLowerCase()
      .startsWith(selectedLetter);
    }

    if(searchTerm) {
      return client.name 
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    }

    return true;
  })
 
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
            <input 
              name="searchbar" 
              id="searchbar" 
              placeholder="Look up company name.." 
              type="search" 
              aria-label="Search clients" 
              value={searchTerm}
              onChange={(e) => {setSearchTerm(e.target.value), setSelectedLetter('')}}
            />
            <img src={SearchIcon} alt="Search icon" className={s.searchIcon}/>
          </form>
        </div>

        <div className={s.alphabeticalFilter}>
          <button
            key='all'
            onClick={() => { setSelectedLetter(''), setSearchTerm('')}}
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

        <p className={s.amountIndicator}>Showing {Math.min(visibleClient, filteredClients.length)} of {totalClients}</p>

        <div id={s.wrapperCardsClients}>
          {filteredClients.slice(0, visibleClient).map(client => (
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
                  <img src={LinkArrow} alt="Arrow icon" className={s.linkArrowCard} />
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
        {visibleClient < filteredClients.length && (
          <button 
            className={s.loadMoreBtn}
            onClick={() => setVisibleClient(prev => prev + 8)}
          >Load more</button>
        )}
      </div>

    </>
  )
}

export default ClientsOverview
