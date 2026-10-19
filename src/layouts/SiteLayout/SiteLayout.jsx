import { useLayoutEffect } from 'react'
import { Outlet, useLocation, useNavigationType } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import { getLenis } from '../../lib/lenis'

const scrollPositions = new Map()

function RouteScrollManager() {
  const location = useLocation()
  const navigationType = useNavigationType()
  const { hash, key, pathname } = location

  useLayoutEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'

    return () => {
      window.history.scrollRestoration = previousScrollRestoration
    }
  }, [])

  useLayoutEffect(() => {
    const target = hash ? document.getElementById(hash.slice(1)) : null
    const savedPosition = scrollPositions.get(key)
    const destination = target ?? (navigationType === 'POP' && savedPosition != null
      ? savedPosition
      : 0)
    const lenis = getLenis()
    const header = document.querySelector('.site-header')
    const headerOffset = target ? -(header?.getBoundingClientRect().height ?? 0) : 0

    if (lenis) {
      lenis.resize()
      lenis.scrollTo(destination, {
        immediate: true,
        offset: headerOffset,
      })
    } else if (target) {
      const targetTop = target.getBoundingClientRect().top + window.scrollY
      window.scrollTo(0, targetTop + headerOffset)
    } else {
      window.scrollTo(0, destination)
    }

    const saveScrollPosition = () => {
      scrollPositions.set(key, window.scrollY)
    }

    saveScrollPosition()
    window.addEventListener('scroll', saveScrollPosition, { passive: true })

    return () => {
      window.removeEventListener('scroll', saveScrollPosition)
    }
  }, [hash, key, navigationType, pathname])

  return null
}

function SiteLayout() {
  const { pathname } = useLocation()
  const isHomePage = pathname === '/'

  return (
    <>
      <RouteScrollManager />
      <Header />
      <Outlet />
      <Footer
        floatingBoundarySelector={
          isHomePage ? '.main-visual' : '.fragrance-hero'
        }
      />
    </>
  )
}

export default SiteLayout
