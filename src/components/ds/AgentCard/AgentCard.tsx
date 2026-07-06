import { useRef, type ReactNode, type MouseEvent } from 'react'

export interface AgentCardProps {
  /** Ex: "Agente de reativação" */
  label: string
  /** Ex: "Corre Atrás" */
  title: string
  description: string
  icon?: ReactNode
  onClick?: () => void
}

const MAX_ROTATE = 10   // graus máximos de inclinação
const SCALE_HOVER = 1.02

export function AgentCard({ label, title, description, icon, onClick }: AgentCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rotateY =  ((x - rect.width  / 2) / rect.width)  * MAX_ROTATE
    const rotateX = -((y - rect.height / 2) / rect.height) * MAX_ROTATE

    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${SCALE_HOVER},${SCALE_HOVER},${SCALE_HOVER})`
    el.style.setProperty('--glare-x', `${x}px`)
    el.style.setProperty('--glare-y', `${y}px`)
    el.style.setProperty('--glare-opacity', '1')
  }

  function handleMouseLeave() {
    const el = cardRef.current
    if (!el) return
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
    el.style.setProperty('--glare-opacity', '0')
  }

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={e => e.key === 'Enter' && onClick?.()}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden cursor-pointer"
      style={{
        width: 360,
        borderRadius: 24,
        willChange: 'transform',
        transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
        transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
        /* gradient border trick — padding-box + border-box */
        background: `
          linear-gradient(rgb(15,19,21), rgb(20,26,30)) padding-box,
          linear-gradient(135deg,
            rgba(255,187,64,0.55) 0%,
            rgba(255,187,64,0.18) 45%,
            rgba(255,187,64,0.06) 100%
          ) border-box
        `,
        border: '1px solid transparent',
      } as React.CSSProperties}
    >
      {/* Glow sutil no rodapé */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(75% 55% at 50% 120%, rgba(255,187,64,0.07), transparent)',
        }}
      />

      {/* Glare seguindo o cursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 'var(--glare-opacity, 0)',
          background: 'radial-gradient(320px circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255,187,64,0.11), transparent 65%)',
          transition: 'opacity 0.15s',
        } as React.CSSProperties}
      />

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col gap-5 p-6">
        {/* Linha do topo: ícone + caret */}
        <div className="flex items-start justify-between">
          {/* Ícone */}
          <div
            className="flex items-center justify-center rounded-2xl"
            style={{
              width: 48,
              height: 48,
              color: '#FFBB40',
              background: 'linear-gradient(135deg, rgba(255,187,64,0.16) 0%, rgba(255,187,64,0.04) 100%)',
              border: '1px solid rgba(255,187,64,0.22)',
            }}
          >
            {icon ?? <DefaultIcon />}
          </div>

          {/* Caret right */}
          <svg
            aria-hidden
            style={{ marginTop: 4, width: 20, height: 20, color: 'rgba(255,187,64,0.5)' }}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>

        {/* Textos */}
        <div>
          <p
            className="font-semibold uppercase"
            style={{
              fontSize: 10,
              letterSpacing: '0.1em',
              color: '#FFBB40',
              opacity: 0.75,
              marginBottom: 6,
            }}
          >
            {label}
          </p>
          <h2
            className="font-bold leading-snug"
            style={{ fontSize: 20, color: '#eef0f2', marginBottom: 12 }}
          >
            {title}
          </h2>
          <p
            className="text-sm leading-relaxed"
            style={{ color: '#8896A0' }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

function DefaultIcon() {
  return (
    <svg
      aria-hidden
      style={{ width: 20, height: 20 }}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  )
}
