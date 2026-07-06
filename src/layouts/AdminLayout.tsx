import type { ReactNode } from 'react'

interface AdminLayoutProps {
  topBar: ReactNode
  sidebar: ReactNode
  children: ReactNode
  sidebarExpanded?: boolean
}

const SIDEBAR_COLLAPSED = 80
const SIDEBAR_EXPANDED  = 240

/**
 * Arquétipo Admin — TopBar (64px) + Sidebar (80px→240px) + Main Content
 * A coluna da sidebar anima suavemente via CSS transition na propriedade width.
 */
export function AdminLayout({ topBar, sidebar, children, sidebarExpanded = false }: AdminLayoutProps) {
  const sidebarWidth = sidebarExpanded ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED

  return (
    <div className="grid h-full" style={{ gridTemplate: '64px 1fr / auto 1fr' }}>
      {/* TopBar — row 1, col span 2 */}
      <header className="col-span-2 row-start-1">
        {topBar}
      </header>

      {/* Sidebar — row 2, col 1 */}
      <aside
        className="row-start-2 col-start-1 overflow-hidden"
        style={{
          width: sidebarWidth,
          transition: 'width 200ms ease',
        }}
      >
        {sidebar}
      </aside>

      {/* Main Content — row 2, col 2 */}
      <main className="row-start-2 col-start-2 overflow-auto bg-bg-secondary">
        {children}
      </main>
    </div>
  )
}
