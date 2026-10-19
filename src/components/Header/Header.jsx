import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'
import { getLenis } from '../../lib/lenis'
import SearchOverlay from '../SearchOverlay/SearchOverlay'
import HeaderToast from '../HeaderToast/HeaderToast'

const SCROLL_DIRECTION_THRESHOLD = 8
const TOP_VISIBILITY_THRESHOLD = 12
const NAVIGATION_TIMEOUT = 3000

const menuItems = [
  ['MAISON', 'hero-visual'],
  ['COLLECTION', 'collection'],
  ['SCENT', 'scent'],
  ['STORY', 'story'],
  ['BEYOND', 'beyond'],
  ['RITUAL', 'ritual'],
]

const collectionFragrances = [
  ['Orphéon', '/fragrances/orpheon'],
  ['Do Son', '/fragrances/do-son'],
  ['Eau Rose', '/fragrances/eau-rose'],
  ['Tam Dao', '/fragrances/tam-dao'],
  ["L’Ombre Dans L’Eau", '/fragrances/lombre-dans-leau'],
  ['Fleur de Peau', '/fragrances/fleur-de-peau'],
]

const utilityToasts = {
  cart: {
    icon: '/images/cart-icon.svg',
    iconWidth: 29,
    message: '장바구니 기능은 현재 준비 중입니다.',
  },
  account: {
    icon: '/images/account-icon.svg',
    iconWidth: 28,
    message: '계정 서비스는 현재 준비 중입니다.',
  },
}

function Header() {
  const { pathname } = useLocation()
  const headerRef = useRef(null)
  const collectionLinkRef = useRef(null)
  const searchButtonRef = useRef(null)
  const searchFrameRef = useRef(null)
  const searchCloseTimeoutRef = useRef(null)
  const toastIdRef = useRef(0)
  const programmaticScrollRef = useRef(false)
  const navigationTimeoutRef = useRef(null)
  const nativeScrollEndRef = useRef(null)
  const [isHidden, setIsHidden] = useState(false)
  const [hasGlassBackground, setHasGlassBackground] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isSearchRendered, setIsSearchRendered] = useState(false)
  const [isCollectionOpen, setIsCollectionOpen] = useState(false)
  const [toast, setToast] = useState(null)

  const dismissToast = useCallback(() => setToast(null), [])

  useEffect(() => {
    if (!isCollectionOpen) return undefined

    const handleEscape = (event) => {
      if (event.key !== 'Escape') return

      collectionLinkRef.current?.focus()
      setIsCollectionOpen(false)
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isCollectionOpen])

  const finishProgrammaticScroll = () => {
    programmaticScrollRef.current = false

    if (navigationTimeoutRef.current !== null) {
      window.clearTimeout(navigationTimeoutRef.current)
      navigationTimeoutRef.current = null
    }

    if (nativeScrollEndRef.current) {
      window.removeEventListener('scrollend', nativeScrollEndRef.current)
      nativeScrollEndRef.current = null
    }
  }

  const startProgrammaticScroll = () => {
    finishProgrammaticScroll()
    programmaticScrollRef.current = true
    setIsHidden(false)
    navigationTimeoutRef.current = window.setTimeout(
      finishProgrammaticScroll,
      NAVIGATION_TIMEOUT,
    )
  }

  useEffect(() => {
    let frameId = null
    let lastDirectionalScroll = Math.max(0, window.scrollY)

    const updateHeaderVisibility = () => {
      frameId = null

      const currentScroll = Math.max(0, window.scrollY)
      const headerHasFocus = headerRef.current?.matches(':focus-within')

      if (
        currentScroll <= TOP_VISIBILITY_THRESHOLD ||
        programmaticScrollRef.current ||
        headerHasFocus
      ) {
        setIsHidden(false)
        if (currentScroll <= TOP_VISIBILITY_THRESHOLD) {
          setHasGlassBackground(false)
        }
        lastDirectionalScroll = currentScroll
        return
      }

      const scrollDelta = currentScroll - lastDirectionalScroll

      if (Math.abs(scrollDelta) < SCROLL_DIRECTION_THRESHOLD) return

      if (scrollDelta > 0) {
        setIsHidden(true)
        setIsCollectionOpen(false)
        setToast(null)
      } else {
        setIsHidden(false)
        setHasGlassBackground(true)
      }
      lastDirectionalScroll = currentScroll
    }

    const requestVisibilityUpdate = () => {
      if (frameId !== null) return
      frameId = window.requestAnimationFrame(updateHeaderVisibility)
    }

    window.addEventListener('scroll', requestVisibilityUpdate, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', requestVisibilityUpdate)
      if (frameId !== null) window.cancelAnimationFrame(frameId)
      if (searchFrameRef.current !== null) {
        window.cancelAnimationFrame(searchFrameRef.current)
      }
      if (searchCloseTimeoutRef.current !== null) {
        window.clearTimeout(searchCloseTimeoutRef.current)
      }
      finishProgrammaticScroll()
    }
  }, [])

  const handleNavigation = (event, targetId) => {
    setIsCollectionOpen(false)
    const target = document.getElementById(targetId)

    if (!target) return

    event.preventDefault()

    const header = event.currentTarget.closest('.site-header')
    const headerPosition = header ? window.getComputedStyle(header).position : ''
    const headerOffset =
      header && (headerPosition === 'fixed' || headerPosition === 'sticky')
        ? header.getBoundingClientRect().height
        : 0
    const lenis = getLenis()

    window.history.pushState(null, '', `/#${targetId}`)
    startProgrammaticScroll()

    if (event.detail > 0) event.currentTarget.blur()

    if (lenis) {
      lenis.scrollTo(target, {
        offset: -headerOffset,
        onComplete: finishProgrammaticScroll,
      })
      return
    }

    const targetTop = target.getBoundingClientRect().top + window.scrollY
    nativeScrollEndRef.current = finishProgrammaticScroll
    window.addEventListener('scrollend', nativeScrollEndRef.current, {
      once: true,
    })
    window.scrollTo({ top: targetTop - headerOffset, behavior: 'smooth' })
  }

  const handleLogoClick = (event) => {
    if (pathname !== '/') return

    event.preventDefault()
    window.history.pushState(null, '', '/')
    startProgrammaticScroll()

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const lenis = getLenis()

    if (lenis) {
      lenis.scrollTo(0, {
        immediate: reduceMotion,
        onComplete: finishProgrammaticScroll,
      })
      return
    }

    if (reduceMotion) {
      window.scrollTo(0, 0)
      finishProgrammaticScroll()
      return
    }

    nativeScrollEndRef.current = finishProgrammaticScroll
    window.addEventListener('scrollend', nativeScrollEndRef.current, {
      once: true,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openSearch = () => {
    if (searchCloseTimeoutRef.current !== null) {
      window.clearTimeout(searchCloseTimeoutRef.current)
      searchCloseTimeoutRef.current = null
    }
    setIsCollectionOpen(false)
    setToast(null)
    setIsHidden(false)
    setIsSearchRendered(true)
    searchFrameRef.current = window.requestAnimationFrame(() => {
      setIsSearchOpen(true)
    })
  }

  const closeSearch = ({ restoreFocus = true, immediate = false } = {}) => {
    setIsSearchOpen(false)

    if (immediate) {
      setIsSearchRendered(false)
      return
    }

    searchCloseTimeoutRef.current = window.setTimeout(() => {
      setIsSearchRendered(false)
      searchCloseTimeoutRef.current = null
      if (restoreFocus) searchButtonRef.current?.focus()
    }, 400)
  }

  const showUtilityToast = (type, anchorElement, isPointerClick) => {
    toastIdRef.current += 1
    setIsCollectionOpen(false)
    if (isPointerClick) anchorElement.blur()
    setToast({
      ...utilityToasts[type],
      anchorElement,
      id: toastIdRef.current,
    })
  }

  return (
    <header
      ref={headerRef}
      className={`site-header${isHidden ? ' site-header--hidden' : ''}${hasGlassBackground ? ' site-header--glass' : ''}`}
      data-node-id="566:3031"
      onFocusCapture={() => setIsHidden(false)}
    >
      <div className="site-header__inner">
        <Link
          className="site-header__logo-link"
          to="/"
          aria-label="DIPTYQUE 홈으로 이동"
          onClick={handleLogoClick}
        >
          <img
            className="site-header__logo"
            src="/images/figma-logo.svg"
            width="116"
            height="36"
            alt=""
            data-node-id="566:3032"
          />
        </Link>

        <nav className="site-header__nav" aria-label="Primary navigation">
          <ul className="site-header__menu">
            {menuItems.map(([label, targetId]) => {
              const isCollection = targetId === 'collection'

              return (
                <li
                  className={`site-header__menu-item${isCollection ? ' site-header__menu-item--collection' : ''}${isCollection && isCollectionOpen ? ' is-open' : ''}`}
                  key={targetId}
                  onPointerEnter={(event) => {
                    if (event.pointerType !== 'mouse') return
                    setIsCollectionOpen(isCollection)
                  }}
                  onPointerLeave={
                    isCollection
                      ? (event) => {
                          if (event.pointerType === 'mouse') {
                            setIsCollectionOpen(false)
                          }
                        }
                      : undefined
                  }
                  onFocusCapture={
                    isCollection
                      ? (event) => {
                          if (
                            !event.target.closest(
                              '.site-header__collection-toggle',
                            )
                          ) {
                            setIsCollectionOpen(true)
                          }
                        }
                      : undefined
                  }
                  onBlurCapture={
                    isCollection
                      ? (event) => {
                          if (!event.currentTarget.contains(event.relatedTarget)) {
                            setIsCollectionOpen(false)
                          }
                        }
                      : undefined
                  }
                >
                  <span className="site-header__menu-trigger">
                    <a
                      ref={isCollection ? collectionLinkRef : undefined}
                      href={`/#${targetId}`}
                      aria-controls={
                        isCollection ? 'collection-dropdown' : undefined
                      }
                      aria-expanded={
                        isCollection ? isCollectionOpen : undefined
                      }
                      onClick={(event) => handleNavigation(event, targetId)}
                    >
                      {label}
                    </a>
                    {isCollection && (
                      <button
                        className="site-header__collection-toggle"
                        type="button"
                        aria-label={`향수 컬렉션 메뉴 ${isCollectionOpen ? '닫기' : '열기'}`}
                        aria-controls="collection-dropdown"
                        aria-expanded={isCollectionOpen}
                        onClick={() => setIsCollectionOpen((open) => !open)}
                      >
                        <span aria-hidden="true">⌄</span>
                      </button>
                    )}
                  </span>

                  {isCollection && (
                    <div
                      id="collection-dropdown"
                      className="site-header__collection-dropdown"
                    >
                      <div className="site-header__collection-panel">
                        <p>EXPLORE THE FRAGRANCES</p>
                        <ul aria-label="Fragrance collection">
                          {collectionFragrances.map(([name, path]) => (
                            <li key={path}>
                              <Link
                                to={path}
                                onClick={() => setIsCollectionOpen(false)}
                              >
                                <span>{name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="site-header__actions" aria-label="Utility navigation">
          <button
            ref={searchButtonRef}
            className="site-header__action-button"
            type="button"
            aria-label="검색 열기"
            aria-haspopup="dialog"
            aria-expanded={isSearchOpen}
            onClick={openSearch}
            data-node-id="566:3059"
          >
            <img
              src="/images/search-icon.svg"
              width="30"
              height="30"
              alt=""
            />
          </button>
          <button
            className="site-header__utility-button site-header__utility-button--cart"
            type="button"
            aria-label="장바구니 안내 보기"
            onClick={(event) =>
              showUtilityToast('cart', event.currentTarget, event.detail > 0)
            }
            data-node-id="566:3055"
          >
            <img
              src="/images/cart-icon.svg"
              width="29"
              height="29"
              alt=""
            />
          </button>
          <button
            className="site-header__utility-button site-header__utility-button--account"
            type="button"
            aria-label="계정 서비스 안내 보기"
            onClick={(event) =>
              showUtilityToast(
                'account',
                event.currentTarget,
                event.detail > 0,
              )
            }
            data-node-id="566:3057"
          >
            <img
              src="/images/account-icon.svg"
              width="28"
              height="29"
              alt=""
            />
          </button>
        </div>
      </div>
      {isSearchRendered && (
        <SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} />
      )}
      {toast && (
        <HeaderToast key={toast.id} toast={toast} onDismiss={dismissToast} />
      )}
    </header>
  )
}

export default Header
