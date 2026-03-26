import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import s from "../styles/Clients.module.scss"
import SearchIcon from "../assets/images/search-icon.svg"
import LinkArrow from "../assets/images/arrow-link.svg"

function ClientsOverview() {

  const [selectedLetter, setSelectedLetter] = useState('');
  const alphabet = 'abcdefghijklmnoprstuwyz'.split(''); // Used for the alphabetical filter
  const clients = [
  {
    "name": "Adidas",
    "group": "Sportswear",
    "progress": 12,
    "totalProjects": 3,
    "activeProjects": 2,
    "projects": [
      {
        "name": "Dashboard Redesign",
        "status": "Active",
        "description": "Redesigning internal dashboard using React and Next.js.",
        "team": 8,
        "budget": "19%",
        "risks": 2,
        "progress": "52%"
      },
      {
        "name": "Mobile App",
        "status": "Planning",
        "description": "Building a new mobile experience for customers.",
        "team": 5,
        "budget": "10%",
        "risks": 1,
        "progress": "20%"
      },
      {
        "name": "Analytics Integration",
        "status": "Active",
        "description": "Integrating analytics tools for better insights.",
        "team": 4,
        "budget": "25%",
        "risks": 2,
        "progress": "60%"
      }
    ]
  },
  {
    "name": "Nike",
    "group": "Sport",
    "progress": 85,
    "totalProjects": 4,
    "activeProjects": 3,
    "projects": [
      {
        "name": "E-commerce Upgrade",
        "status": "Active",
        "description": "Improving checkout and payment systems.",
        "team": 6,
        "budget": "30%",
        "risks": 2,
        "progress": "70%"
      },
      {
        "name": "Inventory System",
        "status": "Active",
        "description": "Optimizing inventory tracking.",
        "team": 5,
        "budget": "22%",
        "risks": 1,
        "progress": "65%"
      },
      {
        "name": "Marketing Dashboard",
        "status": "Completed",
        "description": "Dashboard for campaign tracking.",
        "team": 3,
        "budget": "15%",
        "risks": 0,
        "progress": "100%"
      },
      {
        "name": "Mobile Optimization",
        "status": "Active",
        "description": "Improving mobile responsiveness.",
        "team": 4,
        "budget": "18%",
        "risks": 1,
        "progress": "55%"
      }
    ]
  },
  {
    "name": "Apple",
    "group": "Technology",
    "progress": 64,
    "totalProjects": 5,
    "activeProjects": 2,
    "projects": [
      {
        "name": "iOS Redesign",
        "status": "Planning",
        "description": "Concept redesign for iOS interface.",
        "team": 10,
        "budget": "40%",
        "risks": 3,
        "progress": "15%"
      },
      {
        "name": "Cloud Sync",
        "status": "Active",
        "description": "Improving cloud synchronization speed.",
        "team": 7,
        "budget": "28%",
        "risks": 2,
        "progress": "50%"
      },
      {
        "name": "Security Update",
        "status": "Completed",
        "description": "Enhancing device security features.",
        "team": 6,
        "budget": "20%",
        "risks": 1,
        "progress": "100%"
      },
      {
        "name": "AI Assistant",
        "status": "Active",
        "description": "Upgrading AI assistant capabilities.",
        "team": 9,
        "budget": "35%",
        "risks": 3,
        "progress": "45%"
      },
      {
        "name": "Wearable Integration",
        "status": "Planning",
        "description": "Integrating wearable devices with ecosystem.",
        "team": 5,
        "budget": "18%",
        "risks": 2,
        "progress": "25%"
      }
    ]
  },
  {
    "name": "BMW",
    "group": "Automotive",
    "progress": 91,
    "totalProjects": 2,
    "activeProjects": 1,
    "projects": [
      {
        "name": "Autonomous Driving",
        "status": "Active",
        "description": "Developing self-driving capabilities.",
        "team": 12,
        "budget": "50%",
        "risks": 5,
        "progress": "75%"
      },
      {
        "name": "Infotainment System",
        "status": "Completed",
        "description": "New in-car entertainment system.",
        "team": 6,
        "budget": "30%",
        "risks": 1,
        "progress": "100%"
      }
    ]
  },
  {
    "name": "Google",
    "group": "Technology",
    "progress": 88,
    "totalProjects": 6,
    "activeProjects": 4,
    "projects": [
      {
        "name": "Search Optimization",
        "status": "Active",
        "description": "Improving search result accuracy.",
        "team": 9,
        "budget": "35%",
        "risks": 2,
        "progress": "72%"
      },
      {
        "name": "Ad Platform Upgrade",
        "status": "Active",
        "description": "Enhancing ad targeting system.",
        "team": 8,
        "budget": "40%",
        "risks": 3,
        "progress": "60%"
      },
      {
        "name": "Maps Redesign",
        "status": "Planning",
        "description": "UI overhaul for maps application.",
        "team": 6,
        "budget": "20%",
        "risks": 2,
        "progress": "30%"
      },
      {
        "name": "AI Research",
        "status": "Active",
        "description": "Developing new AI models.",
        "team": 12,
        "budget": "50%",
        "risks": 4,
        "progress": "55%"
      },
      {
        "name": "Cloud Security",
        "status": "Completed",
        "description": "Improving cloud infrastructure security.",
        "team": 7,
        "budget": "25%",
        "risks": 1,
        "progress": "100%"
      },
      {
        "name": "YouTube Features",
        "status": "Active",
        "description": "Adding new creator tools.",
        "team": 5,
        "budget": "18%",
        "risks": 2,
        "progress": "48%"
      }
    ]
  },
  {
    "name": "Amazon",
    "group": "E-commerce",
    "progress": 79,
    "totalProjects": 5,
    "activeProjects": 3,
    "projects": [
      {
        "name": "Warehouse Automation",
        "status": "Active",
        "description": "Automating warehouse operations.",
        "team": 11,
        "budget": "45%",
        "risks": 4,
        "progress": "66%"
      },
      {
        "name": "Delivery Tracking",
        "status": "Active",
        "description": "Real-time delivery tracking improvements.",
        "team": 6,
        "budget": "20%",
        "risks": 2,
        "progress": "58%"
      },
      {
        "name": "Alexa Upgrade",
        "status": "Planning",
        "description": "Enhancing voice assistant features.",
        "team": 7,
        "budget": "25%",
        "risks": 3,
        "progress": "35%"
      },
      {
        "name": "Prime UI",
        "status": "Completed",
        "description": "Redesigning Prime user interface.",
        "team": 5,
        "budget": "15%",
        "risks": 1,
        "progress": "100%"
      },
      {
        "name": "Recommendation Engine",
        "status": "Active",
        "description": "Improving product recommendations.",
        "team": 8,
        "budget": "30%",
        "risks": 2,
        "progress": "62%"
      }
    ]
  },
  {
    "name": "Tesla",
    "group": "Automotive",
    "progress": 83,
    "totalProjects": 3,
    "activeProjects": 2,
    "projects": [
      {
        "name": "Autopilot AI",
        "status": "Active",
        "description": "Improving self-driving algorithms.",
        "team": 10,
        "budget": "50%",
        "risks": 5,
        "progress": "70%"
      },
      {
        "name": "Battery Tech",
        "status": "Planning",
        "description": "Next-gen battery development.",
        "team": 8,
        "budget": "40%",
        "risks": 4,
        "progress": "25%"
      },
      {
        "name": "Charging Network",
        "status": "Completed",
        "description": "Expanding global charging stations.",
        "team": 6,
        "budget": "30%",
        "risks": 2,
        "progress": "100%"
      }
    ]
  },
  {
    "name": "Netflix",
    "group": "Entertainment",
    "progress": 74,
    "totalProjects": 4,
    "activeProjects": 2,
    "projects": [
      {
        "name": "Streaming Optimization",
        "status": "Active",
        "description": "Improving video streaming quality.",
        "team": 7,
        "budget": "28%",
        "risks": 2,
        "progress": "65%"
      },
      {
        "name": "Recommendation AI",
        "status": "Active",
        "description": "Enhancing content recommendations.",
        "team": 9,
        "budget": "35%",
        "risks": 3,
        "progress": "60%"
      },
      {
        "name": "Mobile UX",
        "status": "Planning",
        "description": "Redesigning mobile app experience.",
        "team": 5,
        "budget": "18%",
        "risks": 2,
        "progress": "30%"
      },
      {
        "name": "Content Pipeline",
        "status": "Completed",
        "description": "Optimizing content delivery pipeline.",
        "team": 6,
        "budget": "22%",
        "risks": 1,
        "progress": "100%"
      }
    ]
  }
]

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
      </div>

    </>
  )
}

export default ClientsOverview
