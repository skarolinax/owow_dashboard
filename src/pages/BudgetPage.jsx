import { useNavigate, Link } from 'react-router-dom'
import '../styles/budgetstyles.css'

function StopwatchIcon() {
  return (
    <svg
      className="hours-tracking__pill-icon"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="12" cy="15" r="7.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 10V7.5M9 4h6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M12 15l3.5-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function BudgetBreakdownChartIcon() {
  return (
    <svg
      className="budget-breakdown__pill-icon"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="4" y="12" width="4" height="8" rx="1" fill="#018848" />
      <rect x="10" y="8" width="4" height="12" rx="1" fill="#0988EF" />
      <rect x="16" y="10" width="4" height="10" rx="1" fill="#e85d9a" />
    </svg>
  )
}

function BudgetPage() {
  const navigate = useNavigate()
  const totalBudgetAmount = 125000
  const spentAmount = 24000
  const remainingAmount = totalBudgetAmount - spentAmount
  const dailyBurnAmount = 1443
  const budgetUsedPercent = Math.round((spentAmount / totalBudgetAmount) * 100)

  const hoursPurchased = 100
  const hoursSpent = 50
  const remainingHours = hoursPurchased - hoursSpent
  const hoursUsedPercent = Math.round((hoursSpent / hoursPurchased) * 100)
  const formatBudgetAmount = (amount) =>
    amount >= 1000
      ? `$${(amount / 1000).toFixed(0)}k`
      : `$${amount.toLocaleString()}`

  const budgetBreakdownRows = [
    { name: 'Development', amount: 80000, percent: 64, color: '#ff9f43' },
    { name: 'Design', amount: 20000, percent: 16, color: '#0988EF' },
    { name: 'Testing', amount: 15000, percent: 12, color: '#018848' },
  ]

  const goToProjectsOverview = () => {
    navigate('/projects-overview')
  }
  
  return (
    <div className="budget-page">
      <div className="budget-top">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link className="breadcrumb__link" to="/clients">
            Clients
          </Link>
          <span className="breadcrumb__sep">{'>'}</span>
          <button className="breadcrumb__link" type="button" onClick={goToProjectsOverview}>
            Nike
          </button>
          <span className="breadcrumb__sep">{'>'}</span>
          <span className="breadcrumb__current">Dashboard Redesign</span>
        </nav>

        <button className="btn-back" type="button" onClick={goToProjectsOverview}>
          <span className="btn-back__icon" aria-hidden="true">
            ←
          </span>
          <span className="btn-back__text">Back to Nike</span>
        </button>
      </div>


      <div className="budget-layout">
        <header className="budget-header" aria-label="Budget page header">
          <div className="budget-header__icon" aria-hidden="true">
            💰
          </div>
          <div className="budget-header__text">
            <h1 className="budget-header__title">Budget</h1>
            <p className="budget-header__subtitle">Dashboard Redesign</p>
          </div>
        </header>

        <section className="budget-card" aria-label="Budget used">
          <div className="budget-card__row">
            <div>
              <div className="budget-card__label">Budget used</div>
              <div className="budget-card__amounts">
                <span className="budget-card__amt">${spentAmount.toLocaleString()}</span>
                <span className="budget-card__of"> of </span>
                <span className="budget-card__amt">${totalBudgetAmount.toLocaleString()}</span>
              </div>
            </div>
            <div className="budget-card__percent">{budgetUsedPercent}%</div>
          </div>
          <div
            className="budget-card__track"
            role="progressbar"
            aria-valuenow={budgetUsedPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="budget-card__fill" style={{ width: `${budgetUsedPercent}%` }} />
          </div>
        </section>

        <div className="budget-modules" aria-label="Budget summary modules">
          <div className="budget-module budget-module--total">
            <div className="budget-module__title">Total Budget</div>
            <div className="budget-module__value">{formatBudgetAmount(totalBudgetAmount)}</div>
          </div>

          <div className="budget-module budget-module--spend">
            <div className="budget-module__title">Spent</div>
            <div className="budget-module__value">{formatBudgetAmount(spentAmount)}</div>
          </div>

          <div className="budget-module budget-module--remaining">
            <div className="budget-module__title">Remaining</div>
            <div className="budget-module__value">{formatBudgetAmount(remainingAmount)}</div>
          </div>

          <div className="budget-module budget-module--daily">
            <div className="budget-module__title">Daily Burn</div>
            <div className="budget-module__value">${dailyBurnAmount.toLocaleString()}</div>
          </div>
        </div>

        <section className="hours-tracking" aria-labelledby="hours-tracking-title">
          <div className="hours-tracking__pill">
            <StopwatchIcon />
            <h2 className="hours-tracking__title" id="hours-tracking-title">
              Hours Tracking
            </h2>
          </div>

          <div className="hours-tracking__card">
            <div className="hours-tracking__head">
              <span className="hours-tracking__label">Hours used</span>
              <span className="hours-tracking__pct">{hoursUsedPercent}%</span>
            </div>
            <div
              className="hours-tracking__track"
              role="progressbar"
              aria-valuenow={hoursUsedPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Hours used"
            >
              <div
                className="hours-tracking__fill"
                style={{ width: `${hoursUsedPercent}%` }}
              />
            </div>

            <div className="hours-tracking__metrics">
              <div className="hours-metric hours-metric--purchased">
                <div className="hours-metric__label">Purchased</div>
                <div className="hours-metric__value">{hoursPurchased}h</div>
              </div>
              <div className="hours-metric hours-metric--spent">
                <div className="hours-metric__label">Spent</div>
                <div className="hours-metric__value">{hoursSpent}h</div>
              </div>
              <div className="hours-metric hours-metric--remaining">
                <div className="hours-metric__label">Remaining</div>
                <div className="hours-metric__value">{remainingHours}h</div>
              </div>
            </div>
          </div>
        </section>

        <section className="budget-breakdown" aria-labelledby="budget-breakdown-title">
          <div className="budget-breakdown__pill">
            <BudgetBreakdownChartIcon />
            <h2 className="budget-breakdown__title" id="budget-breakdown-title">
              Budget Breakdown
            </h2>
          </div>

          <div className="budget-breakdown__card">
            {budgetBreakdownRows.map((row) => (
              <div className="budget-breakdown__row" key={row.name}>
                <div className="budget-breakdown__row-head">
                  <div className="budget-breakdown__name">
                    <span
                      className="budget-breakdown__dot"
                      style={{ backgroundColor: row.color }}
                    />
                    <span>{row.name}</span>
                  </div>
                  <div className="budget-breakdown__meta">
                    <span className="budget-breakdown__amount">
                      ${row.amount.toLocaleString()}
                    </span>
                    <span className="budget-breakdown__badge">{row.percent}%</span>
                  </div>
                </div>
                <div
                  className="budget-breakdown__track"
                  role="progressbar"
                  aria-valuenow={row.percent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${row.name} ${row.percent}%`}
                >
                  <div
                    className="budget-breakdown__fill"
                    style={{
                      width: `${row.percent}%`,
                      backgroundColor: row.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

    </div>
  )
}

export default BudgetPage
