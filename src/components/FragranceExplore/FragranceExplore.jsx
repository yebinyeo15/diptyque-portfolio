import { Link } from 'react-router-dom'
import './FragranceExplore.css'

function FragranceExplore({ explore }) {
  return (
    <section className="fragrance-explore" aria-labelledby="explore-title">
      <div className="fragrance-explore__inner">
        <p className="section-pill fragrance-explore__eyebrow">
          {explore.eyebrow}
        </p>
        <h2 id="explore-title">
          {explore.title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>
        <p className="fragrance-explore__description">
          {explore.description.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
        <Link className="fragrance-explore__cta" to="/#collection">
          <span className="fragrance-explore__cta-label">{explore.cta}</span>
          <img
            className="fragrance-explore__cta-icon"
            src="/images/fragrances/arrow-up-right.svg"
            width="25"
            height="25"
            alt=""
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  )
}

export default FragranceExplore
