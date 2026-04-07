import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/roadmap.scss'

function RoadmapPage() {
  const navigate = useNavigate()
  const clientLabel = 'Adidas'
  const projectLabel = 'Project Roadmap'

  const goToProjectsOverview = () => {
    navigate('/clients/adidas')
  }

  return (
    <>
      <main>
        <div className="roadmap-page">

          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link className="breadcrumb__link" to="/clients">
              Clients
            </Link>
            <span className="breadcrumb__sep">{">"}</span>
            <button
              className="breadcrumb__link"
              type="button"
              onClick={goToProjectsOverview}
            >
              {clientLabel}
            </button>
            <span className="breadcrumb__sep">{">"}</span>
            <span className="breadcrumb__current">{projectLabel}</span>
          </nav>

          <div className="roadmap-content">
            <div className="roadmap-card">
              <div className="roadmap-card__label">Project roadmap</div>

              <div className="roadmap-row roadmap-row--done">
                <div className="roadmap-row__check"><div className="check-done">✓</div></div>
                <div className="roadmap-row__info">
                  <div className="roadmap-row__title">Project Initialization</div>
                  <div className="roadmap-row__due">Due: 15 January 2026</div>
                </div>
                <div className="roadmap-row__status"><span className="badge badge--done">Done</span></div>
              </div>

              <div className="roadmap-row roadmap-row--done">
                <div className="roadmap-row__check"><div className="check-done">✓</div></div>
                <div className="roadmap-row__info">
                  <div className="roadmap-row__title">Design & Architecture</div>
                  <div className="roadmap-row__due">Due: 1 February 2026</div>
                </div>
                <div className="roadmap-row__status"><span className="badge badge--done">Done</span></div>
              </div>

              <div className="roadmap-row roadmap-row--delayed">
                <div className="roadmap-row__check"><div className="check-circle" /></div>
                <div className="roadmap-row__info">
                  <div className="roadmap-row__title">Core Development</div>
                  <div className="roadmap-row__due">Due: 26 February 2026</div>
                </div>
                <div className="roadmap-row__status"><span className="badge badge--delayed">In Progress</span></div>
              </div>

              <div className="roadmap-row roadmap-row--pending">
                <div className="roadmap-row__check"><div className="check-circle" /></div>
                <div className="roadmap-row__info">
                  <div className="roadmap-row__title">Testing & QA</div>
                  <div className="roadmap-row__due">Due: 20 March 2026</div>
                </div>
                <div className="roadmap-row__status"><span className="badge badge--ontime">On time</span></div>
              </div>

              <div className="roadmap-row roadmap-row--pending">
                <div className="roadmap-row__check"><div className="check-circle" /></div>
                <div className="roadmap-row__info">
                  <div className="roadmap-row__title">Deployment</div>
                  <div className="roadmap-row__due">Due: 10 April 2026</div>
                </div>
                <div className="roadmap-row__status"><span className="badge badge--ontime">On time</span></div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default RoadmapPage