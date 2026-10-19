import { Navigate, useParams } from 'react-router-dom'
import FragranceExplore from '../../components/FragranceExplore/FragranceExplore'
import FragranceHero from '../../components/FragranceHero/FragranceHero'
import FragranceStory from '../../components/FragranceStory/FragranceStory'
import { fragrances } from '../../data/fragrances'
import './FragrancePage.css'

function FragrancePage() {
  const { fragranceId } = useParams()
  const fragrance = fragrances[fragranceId]

  if (!fragrance) return <Navigate to="/" replace />

  return (
    <main className="fragrance-page">
      <FragranceHero fragrance={fragrance} />
      <FragranceStory
        fragranceName={fragrance.name}
        story={fragrance.story}
      />
      <FragranceExplore explore={fragrance.explore} />
    </main>
  )
}

export default FragrancePage
