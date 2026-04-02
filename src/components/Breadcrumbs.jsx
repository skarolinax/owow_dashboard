import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "../styles/budgetstyles.css";

function Breadcrumbs() {
  const navigate = useNavigate();
  const location = useLocation();
//   const project = location.state?.project;
//   const client = location.state?.client; 

    const goToProjectsOverview = () => {
        navigate("/projects-overview");
    };

 return (
  <div className="budget-top">
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
            Nike
          </button>

          <span className="breadcrumb__sep">{">"}</span>

          <span className="breadcrumb__current">Dashboard Redesign</span>
        </nav>

        <button className="btn-back" type="button" onClick={goToProjectsOverview}>
          <span className="btn-back__icon" aria-hidden="true">
            ←
          </span>
          <span className="btn-back__text">Back to Nike</span>
        </button>
      </div>
 )
}

export default Breadcrumbs;