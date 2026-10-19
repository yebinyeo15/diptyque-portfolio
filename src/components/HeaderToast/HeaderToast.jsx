import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import './HeaderToast.css'

const AUTO_DISMISS_DELAY = 3000
const EXIT_DURATION = 200

function HeaderToast({ toast, onDismiss }) {
  const [isVisible, setIsVisible] = useState(false)
  const toastRef = useRef(null)
  const autoDismissRef = useRef(null)
  const exitRef = useRef(null)

  const dismiss = () => {
    if (autoDismissRef.current !== null) {
      window.clearTimeout(autoDismissRef.current)
      autoDismissRef.current = null
    }

    setIsVisible(false)
    exitRef.current = window.setTimeout(onDismiss, EXIT_DURATION)
  }

  useEffect(() => {
    const updatePosition = () => {
      const toastElement = toastRef.current
      const anchorElement = toast.anchorElement

      if (!toastElement || !anchorElement?.isConnected) return

      const anchorRect = anchorElement.getBoundingClientRect()
      const toastWidth = toastElement.getBoundingClientRect().width
      const edgeSpace = 16
      const idealLeft = anchorRect.left + anchorRect.width / 2 - toastWidth / 2
      const maximumLeft = Math.max(
        edgeSpace,
        window.innerWidth - toastWidth - edgeSpace,
      )
      const clampedLeft = Math.min(
        Math.max(idealLeft, edgeSpace),
        maximumLeft,
      )

      toastElement.style.left = `${Math.round(clampedLeft)}px`
      toastElement.style.top = `${Math.round(anchorRect.bottom + 16)}px`
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)

    return () => window.removeEventListener('resize', updatePosition)
  }, [toast.anchorElement])

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => setIsVisible(true))

    autoDismissRef.current = window.setTimeout(() => {
      setIsVisible(false)
      exitRef.current = window.setTimeout(onDismiss, EXIT_DURATION)
    }, AUTO_DISMISS_DELAY)

    return () => {
      window.cancelAnimationFrame(frameId)
      if (autoDismissRef.current !== null) {
        window.clearTimeout(autoDismissRef.current)
      }
      if (exitRef.current !== null) window.clearTimeout(exitRef.current)
    }
  }, [onDismiss])

  return createPortal(
    <div
      ref={toastRef}
      className={`header-toast${isVisible ? ' header-toast--visible' : ''}`}
    >
      <img
        className="header-toast__icon"
        src={toast.icon}
        width={toast.iconWidth}
        height="29"
        alt=""
      />
      <div className="header-toast__copy" role="status" aria-live="polite">
        <strong>서비스 준비 중</strong>
        <p>{toast.message}</p>
      </div>
      <button
        className="header-toast__close"
        type="button"
        aria-label="알림 닫기"
        onClick={dismiss}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
    </div>,
    document.body,
  )
}

export default HeaderToast
