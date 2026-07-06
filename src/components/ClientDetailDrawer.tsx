import { useEffect } from 'react'

export interface ExpectedClient {
  id: number
  nome: string
  telefone: string
  perfil: 'Platinum' | 'Gold' | 'Silver'
  ultimaCompra: string
  diasAusente: string
  categoria: string
  padrao: string
  bonus: string
  minResgate: string
  vencimento: string
  vencimentoLevel: 'urgent' | 'soon' | 'normal'
  historico: {
    comprasNaMarca: number
    frequencia: string
    ticketHistorico: string
    ultimaCompraData: string
    categoriaPreferida: string
    lojaPreferida: string
  }
  dica: string
}

export const PERFIL_TAG_STYLE: Record<ExpectedClient['perfil'], { bg: string; border: string; color: string }> = {
  Platinum: { bg: 'rgba(31,140,179,0.2)', border: '#80CDE9', color: '#80CDE9' },
  Gold:     { bg: 'rgba(230,148,0,0.2)',  border: '#FFBB40', color: '#FFBB40' },
  Silver:   { bg: 'rgba(136,150,160,0.15)', border: '#9EAAB3', color: '#9EAAB3' },
}

export const VENCIMENTO_STYLE: Record<ExpectedClient['vencimentoLevel'], { bg: string; border: string; color: string }> = {
  urgent: { bg: 'rgba(179,31,31,0.2)', border: '#E98080', color: '#E98080' },
  soon:   { bg: 'rgba(230,148,0,0.2)', border: '#FFBB40', color: '#FFBB40' },
  normal: { bg: 'rgba(77,182,163,0.2)', border: '#4DB6A3', color: '#4DB6A3' },
}

export function PerfilPill({ perfil }: { perfil: ExpectedClient['perfil'] }) {
  const s = PERFIL_TAG_STYLE[perfil]
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', height: 32, padding: '0 12px',
      backgroundColor: s.bg, border: `1px solid ${s.border}`, borderRadius: 4,
      fontSize: 12, fontWeight: 500, color: s.color, whiteSpace: 'nowrap',
    }}>
      {perfil}
    </span>
  )
}

export function VencimentoPill({ label, level }: { label: string; level: ExpectedClient['vencimentoLevel'] }) {
  const s = VENCIMENTO_STYLE[level]
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', height: 28, padding: '0 12px',
      backgroundColor: s.bg, border: `1px solid ${s.border}`, borderRadius: 999,
      fontSize: 12, fontWeight: 500, color: s.color, whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  )
}

interface ClientDetailDrawerProps {
  client: ExpectedClient | null
  onClose: () => void
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontSize: 12, fontWeight: 500, color: '#8896A0', lineHeight: '16px', whiteSpace: 'nowrap' }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--cds-text-primary)', lineHeight: '20px', whiteSpace: 'nowrap' }}>{value}</span>
    </div>
  )
}

function HistoricoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--cds-border-subtle, #353e45)' }}>
      <span style={{ fontSize: 13, color: '#8896A0' }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--cds-text-primary)' }}>{value}</span>
    </div>
  )
}

export function ClientDetailDrawer({ client, onClose }: ClientDetailDrawerProps) {
  useEffect(() => {
    if (!client) return
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [client, onClose])

  if (!client) return null
  const perfilStyle = PERFIL_TAG_STYLE[client.perfil]
  const vencStyle = VENCIMENTO_STYLE[client.vencimentoLevel]

  return (
    <>
      {/* overlay */}
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(18,20,22,0.6)', zIndex: 100 }}
      />

      {/* drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 600, maxWidth: '100%',
        backgroundColor: '#121416', borderLeft: '1px solid #3D464D',
        zIndex: 101, display: 'flex', flexDirection: 'column',
      }}>
        {/* header */}
        <div style={{
          height: 80, flexShrink: 0, padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          backgroundColor: '#22272B', borderBottom: '1px solid #3D464D',
        }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#EEF0F2' }}>Detalhe do cliente</span>
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

          {/* title row */}
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--cds-text-primary)' }}>{client.nome}</span>
              <span style={{ fontSize: 13, color: '#8896A0' }}>{client.telefone}</span>
            </div>
            <span style={{
              display: 'inline-flex', alignItems: 'center', height: 32, padding: '0 12px',
              backgroundColor: perfilStyle.bg, border: `1px solid ${perfilStyle.border}`, borderRadius: 4,
              fontSize: 12, fontWeight: 500, color: perfilStyle.color, whiteSpace: 'nowrap', flexShrink: 0,
            }}>
              {client.perfil}
            </span>
          </div>

          {/* highlight card */}
          <div style={{
            padding: '40px 32px', borderRadius: 24,
            background: 'linear-gradient(rgb(20,23,26), rgb(20,23,26)) padding-box, linear-gradient(172deg, rgba(255,165,0,1) 0%, rgba(34,39,43,1) 38%) border-box',
            border: '1px solid transparent',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, gap: 10 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 30, fontWeight: 600, color: 'var(--cds-text-primary)', lineHeight: '36px' }}>{client.bonus}</span>
                <span style={{ fontSize: 12, color: '#8896A0' }}>Mínimo para resgate: {client.minResgate}</span>
              </div>
              <span style={{
                display: 'inline-flex', alignItems: 'center', height: 28, padding: '0 12px', flexShrink: 0,
                backgroundColor: vencStyle.bg, border: `1px solid ${vencStyle.border}`, borderRadius: 999,
                fontSize: 12, fontWeight: 500, color: vencStyle.color, whiteSpace: 'nowrap',
              }}>
                {client.vencimento}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <DetailField label="Última compra" value={client.ultimaCompra} />
              <DetailField label="Dias ausente" value={client.diasAusente} />
              <DetailField label="Padrão de compra" value={`${client.categoria} - ${client.padrao}`} />
            </div>
          </div>

          {/* historico */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#FFFFFF' }}>Histórico na marca</h3>
            <div>
              <HistoricoRow label="Compras na marca" value={String(client.historico.comprasNaMarca)} />
              <HistoricoRow label="Frequência" value={client.historico.frequencia} />
              <HistoricoRow label="Ticket histórico" value={client.historico.ticketHistorico} />
              <HistoricoRow label="Última compra" value={client.historico.ultimaCompraData} />
              <HistoricoRow label="Categoria preferida" value={client.historico.categoriaPreferida} />
              <HistoricoRow label="Loja preferida" value={client.historico.lojaPreferida} />
            </div>
          </div>

          {/* dica alert */}
          <div style={{
            display: 'flex', gap: 16, alignItems: 'flex-start', padding: 16, borderRadius: 8,
            backgroundColor: 'rgba(31,140,179,0.2)', border: '1px solid #80CDE9',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#80CDE9" strokeWidth="1.5" style={{ flexShrink: 0, marginTop: 2 }}>
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="11" /><line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#80CDE9' }}>Dica</span>
              <span style={{ fontSize: 13, color: '#EEF0F2', lineHeight: 1.5 }}>{client.dica}</span>
            </div>
          </div>
        </div>

        {/* footer */}
        <div style={{
          height: 80, flexShrink: 0, padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
          backgroundColor: '#22272B', borderTop: '1px solid #3D464D',
        }}>
          <button
            onClick={onClose}
            style={{
              height: 40, padding: '0 16px', border: '1px solid #EEF0F2', borderRadius: 4,
              background: 'none', color: '#EEF0F2', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            Fechar
          </button>
        </div>
      </div>
    </>
  )
}
