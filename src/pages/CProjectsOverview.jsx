import { Link, useLocation, useNavigate } from 'react-router-dom'
import s from "../styles/Clients.module.scss"

function CProjectsOverview() {
  const location = useLocation();
  const client = location.state?.client;
  const role = location.state?.role;

  const navigate = useNavigate();

  if (!client) return <p>No projects data found</p>

  const activeClientProjects = client.projects.filter(
    project => project.status === "Active"
  ).length;

  const averageProjectsProgress = Math.round(client.projects.reduce(
    (sum, project) => sum + project.progress, 0) / client.projects.length
  );

  const budgetUsed = Math.round(client.projects.reduce(
    (sum, project) => sum + project.budget, 0) / client.projects.length
  );

  return (
    <>

      <div className={s.wrapperAllProjects}>
        {role === "client" ? null : (
          <button onClick={() => navigate(-1)} className={s.btnGoBackClients}>← Back to all clients</button>
        )}
        <div className={s.headingProjectsPage}>
          {role === "client" ? (
            <div>
              <h1>Welcome back, Nike!</h1>
              <p>Manage your projects today.</p>
            </div>
          ) : (
            <>
              <div className={s.letterBox}>{client.name.charAt(0)}</div>
              <div>
                <h1>{client.name}</h1>
                <p>{client.group}</p>
              </div>
            </>
          )}
        </div>

        <section className={s.wrapperInfoProject}>
          <div className={s.card}>
            <p>Total</p>
            <p>{client.projects.length}</p>
          </div>

          <div className={`${s.card} ${s['card--success']}`}>
            <p>Active</p>
            <p>{activeClientProjects}</p>
          </div>

          <div className={`${s.card} ${s['card--info1']}`}>
            <p>Average progress</p>
            <p>{averageProjectsProgress}%</p>
          </div>

          <div className={`${s.card} ${s['card--info2']}`}>
            <p>Budget used</p>
            <p>{budgetUsed}%</p>
          </div>
        </section>

        <h3>Projects Overview</h3>
        <div className={s.wrapperCardProject}>
          {client.projects.map(project => (
            <Link
              to="/grid-dashboard"
              state={{project, client}}
              key={project.name}
            >
              <div className={s.cardProjectSpecific}>
                <div>
                  <p className={s.cardProjectName}>{project.name}</p>
                  <p className={`${s.cardProjectStatus} 
                  ${project.status === "Active" 
                    ? s["cardProjectStatus--active"]
                    : project.status === "Completed" 
                    ? s["cardProjectStatus--completed"]
                    : s["cardProjectStatus--planning"]
                  }`}>{project.status}</p>
                </div>
                <p className={s.cardProjectDescription}>{project.description}</p>
                <div className={s.cardExtraPDetails}>
                  <div>
                    <p className={s.membersCardText}>Team Members</p>
                    <p>{project.team}</p>
                  </div>
                  <div>
                    <p className={s.risksCardText}>Risks</p>

                    <p className={`${s.risksCardNumber}
                    ${project.risks > 2
                      ? s["risksCardNumber--highRisk"]
                      : ""
                    }
                    
                    `}>{project.risks}</p>
                  </div>
                  <div>
                    <p className={s.budgetCardText}>Budget Used</p>
                    <p>{project.budget}%</p>
                  </div>
                </div>

                <div className={s.cardProgressData}>
                  <p>Progress</p>
                  <p>{project.progress}%</p>
                </div>

                <div className={s.progressBarContainer}>
                  <div style={{width: `${project.progress || 0}%`}}></div>
                </div>

                <button>Go to dashboard</button>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </>
  )
}

export default CProjectsOverview




