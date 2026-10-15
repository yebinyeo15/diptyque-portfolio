import { useEffect, useRef, useState } from 'react'
import './Header.css'
import { getLenis } from '../../lib/lenis'

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

function Header() {
  const headerRef = useRef(null)
  const programmaticScrollRef = useRef(false)
  const navigationTimeoutRef = useRef(null)
  const nativeScrollEndRef = useRef(null)
  const [isHidden, setIsHidden] = useState(false)
  const [hasGlassBackground, setHasGlassBackground] = useState(false)

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
      finishProgrammaticScroll()
    }
  }, [])

  const handleNavigation = (event, targetId) => {
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

  return (
    <header
      ref={headerRef}
      className={`site-header${isHidden ? ' site-header--hidden' : ''}${hasGlassBackground ? ' site-header--glass' : ''}`}
      data-node-id="566:3031"
      onFocusCapture={() => setIsHidden(false)}
    >
      <div className="site-header__inner">
        <img
          className="site-header__logo"
          src="/images/figma-logo.svg"
          width="116"
          height="36"
          alt="Diptyque Paris"
          data-node-id="566:3032"
        />

        <nav className="site-header__nav" aria-label="Primary navigation">
          <ul className="site-header__menu">
            {menuItems.map(([label, targetId]) => (
              <li className="site-header__menu-item" key={targetId}>
                <a
                  href={`/#${targetId}`}
                  onClick={(event) => handleNavigation(event, targetId)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions" aria-label="Utility navigation">
          <img
            src="/images/search-icon.svg"
            width="30"
            height="30"
            alt="Search"
            data-node-id="566:3059"
          />
          <img
            src="/images/cart-icon.svg"
            width="29"
            height="29"
            alt="Cart"
            data-node-id="566:3055"
          />
          <img
            src="/images/account-icon.svg"
            width="28"
            height="29"
            alt="Account"
            data-node-id="566:3057"
          />
        </div>
      </div>
    </header>
  )
}

export default Header
