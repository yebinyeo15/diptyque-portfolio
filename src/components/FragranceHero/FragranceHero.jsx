import { Link } from 'react-router-dom'
import './FragranceHero.css'

function FragranceHero({ fragrance }) {
  return (
    <section className="fragrance-hero" aria-labelledby="fragrance-title">
      <div className="fragrance-hero__inner">
        <Link className="fragrance-hero__back" to="/#collection">
          <span aria-hidden="true">←</span>
          BACK TO COLLECTION
        </Link>
        <h1 id="fragrance-title" className="fragrance-hero__title">
          {fragrance.name}
        </h1>
        <p className="fragrance-hero__description">
          {fragrance.description.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
        <dl className="fragrance-hero__details">
          {fragrance.details.map(({ label, value }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <img
          className="fragrance-hero__image"
          src={fragrance.heroImage}
          alt={`${fragrance.name} Eau de Parfum`}
        />
      </div>
    </section>
  )
}

export default FragranceHero
