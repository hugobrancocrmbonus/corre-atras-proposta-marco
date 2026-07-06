import { useEffect, type ReactNode } from 'react'

export interface SideDrawerProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
  width?: number
}

export function SideDrawer({ isOpen, onClose, title, children, footer, width = 600 }: SideDrawerProps) {
  useEffect(() => {
    if (!isOpen) return
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  return (
    <>
      {/* overlay */}
      <div
        onClick={onClose}
        aria-hidden
        className="transition-opacity duration-300"
        style={{
          position: 'fixed', inset: 0, zIndex: 100,
          backgroundColor: 'rgba(18,20,22,0.6)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      />

      {/* drawer */}
      <div
        role="dialog"
        aria-modal
        aria-label={title}
        className="transition-transform duration-300 ease-in-out"
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, width, maxWidth: '100%',
          backgroundColor: '#121416', borderLeft: '1px solid #3D464D',
          zIndex: 101, display: 'flex', flexDirection: 'column',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        {/* header */}
        <div style={{
          height: 80, flexShrink: 0, padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          backgroundColor: '#22272B', borderBottom: '1px solid #3D464D',
        }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#EEF0F2' }}>{title}</span>
          <button
            onClick={onClose}
            aria-label="Fechar"
            style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: '#EEF0F2' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* content */}
        <div className="dark-scroll" style={{ flex: 1, overflowY: 'auto', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 24, backgroundColor: '#14171A' }}>
          {children}
        </div>

        {/* footer */}
        {footer && (
          <div style={{
            height: 80, flexShrink: 0, padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12,
            backgroundColor: '#22272B', borderTop: '1px solid #3D464D',
          }}>
            {footer}
          </div>
        )}
      </div>
    </>
  )
}
