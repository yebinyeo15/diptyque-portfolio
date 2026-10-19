import './FragranceStory.css'

function FragranceStory({ fragranceName, story }) {
  return (
    <section className="fragrance-story" aria-labelledby="story-title">
      <div className="fragrance-story__inner">
        <header className="fragrance-story__heading">
          <p className="fragrance-story__eyebrow">{story.eyebrow}</p>
          <h2 id="story-title">{story.title}</h2>
          <p className="fragrance-story__description">
            {story.description.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
        </header>
        <div className="fragrance-story__media-grid">
          <img
            src={story.image}
            alt={`${fragranceName} story scene`}
          />
          <video
            src={story.video}
            poster={story.poster}
            aria-label={`${fragranceName} story video`}
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
        <img
          className="fragrance-story__feature-image"
          src={story.featureImage}
          alt={`${fragranceName} story interior`}
        />
      </div>
    </section>
  )
}

export default FragranceStory
