import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import { fragrances } from '../../data/fragrances'
import { getLenis } from '../../lib/lenis'
import './SearchOverlay.css'

const popularSearches = ['ORPHÉON', 'FLEUR DE PEAU', 'DO SON', '사용방법']

const searchEntries = [
  {
    slug: 'orpheon',
    koreanName: '오르페옹',
    aliases: ['orpheon', 'orphéon', '오르페옹', '오페르옹'],
  },
  {
    slug: 'do-son',
    koreanName: '도손',
    aliases: ['do son', 'doson', '도손'],
  },
  {
    slug: 'eau-rose',
    koreanName: '오 로즈',
    aliases: ['eau rose', 'eaurose', '오 로즈', '오로즈'],
  },
  {
    slug: 'tam-dao',
    koreanName: '탐다오',
    aliases: ['tam dao', 'tamdao', '탐다오'],
  },
  {
    slug: 'lombre-dans-leau',
    koreanName: '롬브르 단 로',
    aliases: [
      "l'ombre dans l'eau",
      'lombre dans leau',
      'lombredansleau',
      '롬브르 단 로',
      '롬브르단로',
    ],
  },
  {
    slug: 'fleur-de-peau',
    koreanName: '플레르 드 뽀',
    aliases: [
      'fleur de peau',
      'fleurdepeau',
      '플레르 드 뽀',
      '플레르드뽀',
    ],
  },
].map((entry) => ({ ...entry, fragrance: fragrances[entry.slug] }))

const guideAliases = ['사용방법', '사용 방법', '향수 사용', '향수사용', '뿌리는법', '뿌리는 법']

function normalizeSearchTerm(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase()
    .replace(/[’'\s-]/g, '')
    .trim()
}

function SearchOverlay({ isOpen, onClose }) {
  const { pathname } = useLocation()
  const [query, setQuery] = useState('')
  const dialogRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const lenis = getLenis()
    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    lenis?.stop()

    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
      lenis?.start()
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return undefined

    const focusId = window.setTimeout(() => inputRef.current?.focus(), 50)

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const focusableElements = dialogRef.current?.querySelectorAll(
        'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )

      if (!focusableElements?.length) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.clearTimeout(focusId)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const normalizedQuery = normalizeSearchTerm(query)
  const showGuide = useMemo(
    () =>
      normalizedQuery.length > 0 &&
      guideAliases.some((alias) =>
        normalizeSearchTerm(alias).includes(normalizedQuery),
      ),
    [normalizedQuery],
  )
  const results = useMemo(() => {
    if (!normalizedQuery) return []

    return searchEntries.filter((entry) =>
      entry.aliases.some((alias) =>
        normalizeSearchTerm(alias).includes(normalizedQuery),
      ),
    )
  }, [normalizedQuery])

  const handleLogoClick = (event) => {
    const isHomePage = pathname === '/'

    if (isHomePage) {
      event.preventDefault()
      window.history.pushState(null, '', '/')
    }

    onClose({ restoreFocus: false, immediate: true })

    if (!isHomePage) return

    window.requestAnimationFrame(() => {
      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      const lenis = getLenis()

      if (lenis) {
        lenis.scrollTo(0, { immediate: reduceMotion })
      } else {
        window.scrollTo({
          top: 0,
          behavior: reduceMotion ? 'auto' : 'smooth',
        })
      }
    })
  }

  return createPortal(
    <div
      className={`search-overlay${isOpen ? ' search-overlay--visible' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-overlay-title"
      ref={dialogRef}
    >
      <div className="search-overlay__topbar">
        <Link
          className="search-overlay__logo-link"
          to="/"
          aria-label="DIPTYQUE 홈으로 이동"
          onClick={handleLogoClick}
        >
          <img
            className="search-overlay__logo"
            src="/images/figma-logo.svg"
            width="116"
            height="36"
            alt=""
          />
        </Link>
        <button
          className="search-overlay__close"
          type="button"
          aria-label="검색 닫기"
          onClick={() => onClose()}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      <div className="search-overlay__content">
        <p className="search-overlay__eyebrow">WHAT ARE YOU LOOKING FOR?</p>
        <h2 id="search-overlay-title">Discover your scent.</h2>

        <div className="search-overlay__field">
          <img src="/images/search-icon.svg" width="30" height="30" alt="" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="향수 이름이나 키워드를 검색해 보세요"
            aria-label="향수 검색"
          />
        </div>

        {!normalizedQuery ? (
          <section className="search-overlay__popular" aria-labelledby="popular-searches-title">
            <h3 id="popular-searches-title">POPULAR SEARCHES</h3>
            <div className="search-overlay__pills">
              {popularSearches.map((term) => (
                <button key={term} type="button" onClick={() => setQuery(term)}>
                  {term}
                </button>
              ))}
            </div>
          </section>
        ) : (
          <div className="search-overlay__results" aria-live="polite">
            {showGuide && (
              <article className="search-overlay__guide">
                <p>FRAGRANCE GUIDE</p>
                <h3>향수 사용방법</h3>
                <div />
                <span>
                  향수는 손목이나 목 주변에 가볍게 분사한 뒤 자연스럽게 건조해
                  주세요. 피부를 강하게 문지르지 않는 것이 좋습니다.
                </span>
              </article>
            )}

            {results.map(({ slug, koreanName, fragrance }) => (
              <Link
                className="search-overlay__result"
                key={slug}
                to={`/fragrances/${slug}`}
                onClick={() =>
                  onClose({ restoreFocus: false, immediate: true })
                }
              >
                <img src={fragrance.heroImage} alt="" />
                <span className="search-overlay__result-name">
                  <strong>{fragrance.name}</strong>
                  <span>{koreanName}</span>
                </span>
                <span className="search-overlay__arrow" aria-hidden="true">↗</span>
              </Link>
            ))}

            {!showGuide && results.length === 0 && (
              <p className="search-overlay__empty">
                검색 결과가 없습니다. 다른 향수 이름을 입력해 보세요.
              </p>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}

export default SearchOverlay
