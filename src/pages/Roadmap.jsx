import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/roadmap.scss'

function RoadmapPage() {

  return (
    <>
      <div class="roadmap-page">
        <nav class="breadcrumb">...</nav>
        <a class="btn-back">← Back to Nike</a>

        <div class="roadmap-content">
          <div class="roadmap-header">...</div>
          <div class="roadmap-card">
            <div class="roadmap-card__label">Project roadmap</div>

            <div class="roadmap-row roadmap-row--done">
              <div class="roadmap-row__check"><div class="check-done">...</div></div>
              <div class="roadmap-row__info">
                <div class="roadmap-row__title">Send wireframe</div>
                <div class="roadmap-row__due">Due: 18 March 2026</div>
              </div>
              <div class="roadmap-row__status"><span class="badge badge--done">Done</span></div>
            </div>
            <div class="roadmap-row roadmap-row--delayed">
              <div class="roadmap-row__check"><div class="check-delayed">...</div></div>
              <div class="roadmap-row__info">
                <div class="roadmap-row__title">Send wireframe</div>
                <div class="roadmap-row__due">Due: 18 March 2026</div>
              </div>
              <div class="roadmap-row__status"><span class="badge badge--delayed">Delayed</span></div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default RoadmapPage
