import { useNavigate, Link } from 'react-router-dom'
import '../styles/budgetstyles.css'

function BudgetPage() {
  const navigate = useNavigate()
  const totalBudgetAmount = 125000
  const spentAmount = 24000
  const remainingAmount = totalBudgetAmount - spentAmount
  const dailyBurnAmount = 1443
  const budgetUsedPercent = Math.round((spentAmount / totalBudgetAmount) * 100)
  const formatBudgetAmount = (amount) =>
    amount >= 1000
      ? `$${(amount / 1000).toFixed(0)}k`
      : `$${amount.toLocaleString()}`
   
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

      </div>

    </div>
  )
}

export default BudgetPage
