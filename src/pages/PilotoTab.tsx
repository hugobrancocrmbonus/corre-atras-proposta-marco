import { useState } from 'react'
import { Macrocard } from '@ds/Macrocard/Macrocard'

const B = import.meta.env.BASE_URL

interface Decision {
  id: string
  title: string
  tagLabel: string
  tagColor: string
  tagBg: string
  text: string
  primaryLabel: string
  secondaryLabel: string
}

const DECISIONS: Decision[] = [
  {
    id: 'camila',
    title: 'Camila Rezende — cliente de altíssimo valor',
    tagLabel: 'Acima do teto', tagColor: '#E98080', tagBg: 'rgba(179,31,31,0.2)',
    text: 'A oferta calculada para Camila seria R$ 400, acima do teto de R$ 250 que você definiu. O piloto parou aqui para que você decida.',
    primaryLabel: 'Aprovar R$400,00',
    secondaryLabel: 'Manter R$250,00',
  },
  {
    id: 'telefones',
    title: '12 clientes com telefone a confirmar',
    tagLabel: 'Baixa confiança', tagColor: '#9EAAB3', tagBg: 'rgba(136,150,160,0.15)',
    text: 'A busca sinalizou possível troca de número. O piloto separou esses contatos até você decidir.',
    primaryLabel: 'Contactar mesmo assim',
    secondaryLabel: 'Deixar de fora',
  },
  {
    id: 'calcados',
    title: 'Segmento novo com bom potencial: calçados',
    tagLabel: 'Fora da regra', tagColor: '#80CDE9', tagBg: 'rgba(31,140,179,0.2)',
    text: 'O piloto notou 18 clientes de calçados sumidos com padrão parecido ao seu público atual. Está fora da regra atual (só afetados e vestuário).',
    primaryLabel: 'Incluir calçados',
    secondaryLabel: 'Ignorar',
  },
]

const RULES = [
  { label: 'Janela de churn',   value: '8 meses' },
  { label: 'Faixa de bônus',    value: 'R$150 - R$250' },
  { label: 'Limite por dia',    value: '50 disparos' },
  { label: 'Público',           value: 'Sumidos - Loja preferida - sem bônus ativo' },
  { label: 'Canal',             value: 'Whatsapp' },
]

const ACTIVITY = [
  { text: '50 clientes contatados (Platinum e Gold)', time: 'Hoje, 14h20' },
  { text: 'Público do dia montado - dois de baixa confiança separados', time: 'Hoje, 9h00' },
  { text: 'Oferta de gold ajustada de R$200,00 para R$220,00', time: 'Ontem, 18h40' },
  { text: 'Regras aprovadas por você', time: '28/06' },
]

function RuleRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '10px 0', borderBottom: '1px solid #22272B' }}>
      <span style={{ fontSize: 13, color: '#8896A0', whiteSpace: 'nowrap' }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--cds-text-primary)', textAlign: 'right' }}>{value}</span>
    </div>
  )
}

function DecisionCard({ decision, onResolve }: { decision: Decision; onResolve: (id: string) => void }) {
  return (
    <div style={{
      border: '1px solid #3D464D', borderRadius: 12, padding: 20,
      backgroundColor: '#1D2124', display: 'flex', flexDirection: 'column', gap: 12,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--cds-text-primary)' }}>{decision.title}</span>
        <span style={{
          flexShrink: 0, display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 10px',
          backgroundColor: decision.tagBg, border: `1px solid ${decision.tagColor}`, borderRadius: 999,
          fontSize: 11, fontWeight: 500, color: decision.tagColor, whiteSpace: 'nowrap',
        }}>
          {decision.tagLabel}
        </span>
      </div>
      <p style={{ margin: 0, fontSize: 13, color: '#BCC6CD', lineHeight: 1.5 }}>{decision.text}</p>
      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
        <button
          onClick={() => onResolve(decision.id)}
          style={{ height: 36, padding: '0 14px', border: 'none', borderRadius: 4, backgroundColor: '#FFBB40', color: '#14171A', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}
        >
          {decision.primaryLabel}
        </button>
        <button
          onClick={() => onResolve(decision.id)}
          style={{ height: 36, padding: '0 14px', border: '1px solid #EEF0F2', borderRadius: 4, background: 'none', color: '#EEF0F2', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}
        >
          {decision.secondaryLabel}
        </button>
      </div>
    </div>
  )
}

export function PilotoTab() {
  const [pending, setPending] = useState<string[]>(DECISIONS.map(d => d.id))

  function resolve(id: string) {
    setPending(prev => prev.filter(p => p !== id))
  }

  const visibleDecisions = DECISIONS.filter(d => pending.includes(d.id))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '24px 32px 32px 32px' }}>

      {/* header row with "Em teste" tag */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', height: 28, padding: '0 12px',
          border: '1px solid #3D464D', borderRadius: 999, fontSize: 12, color: '#8896A0',
        }}>
          Em teste
        </span>
      </div>

      {/* KPIs últimos 7 dias */}
      <Macrocard
        title="O que o piloto fez nos últimos 7 dias"
        cards={[
          { title: 'Clientes contatados', value: '210', change: '00%', iconSrc: `${B}icons/icon-message.png` },
          { title: 'Voltaram à loja',      value: '41',  change: '20%', iconSrc: `${B}icons/icon-target.png` },
          { title: 'Receita incremental',  value: 'R$ 38.400,00', change: '', iconSrc: `${B}icons/icon-check.png` },
          { title: 'Rodou sozinho',        value: '96%', change: '', iconSrc: `${B}icons/icon-calendar.png` },
        ]}
      />

      {/* 2-column: decisões + regras/atividade */}
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>

        {/* left: decisões */}
        <div style={{ flex: '1 1 0', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <h3 style={{ margin: '0 0 4px', fontSize: 18, fontWeight: 700, color: 'var(--cds-text-primary)' }}>
              {visibleDecisions.length} decisões precisam de você
            </h3>
            <p style={{ margin: 0, fontSize: 13, color: '#8896A0' }}>
              O piloto só te chama quando algo foge das suas regras.
            </p>
          </div>

          {visibleDecisions.length === 0 && (
            <div style={{ border: '1px solid #3D464D', borderRadius: 12, padding: 24, textAlign: 'center', color: '#8896A0', fontSize: 13 }}>
              Nenhuma decisão pendente — o piloto está rodando dentro das regras.
            </div>
          )}

          {visibleDecisions.map(d => (
            <DecisionCard key={d.id} decision={d} onResolve={resolve} />
          ))}
        </div>

        {/* right: regras + atividade */}
        <div style={{ flex: '0 0 360px', display: 'flex', flexDirection: 'column', gap: 16 }}>

          <div style={{ border: '1px solid #3D464D', borderRadius: 12, padding: 20, backgroundColor: '#1D2124' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
              <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: 'var(--cds-text-primary)' }}>Suas regras</h4>
              <span style={{ fontSize: 12, color: '#81D147' }}>Política aprovada</span>
            </div>
            <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#8896A0' }}>Histórico na marca</p>
            <div style={{ marginBottom: 16 }}>
              {RULES.map(r => <RuleRow key={r.label} label={r.label} value={r.value} />)}
            </div>
            <p style={{ margin: '0 0 16px', fontSize: 12, color: '#8896A0', lineHeight: 1.5 }}>
              Você aprovou em 28/06. Ajustes valem para os próximos envios — o piloto não refaz o que já saiu.
            </p>
            <button style={{
              width: '100%', height: 40, border: '1px solid #EEF0F2', borderRadius: 4, background: 'none',
              color: '#EEF0F2', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
            }}>
              Ajustar regras
            </button>
          </div>

          <div style={{ border: '1px solid #3D464D', borderRadius: 12, padding: 20, backgroundColor: '#1D2124' }}>
            <h4 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 700, color: 'var(--cds-text-primary)' }}>Atividade recente</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {ACTIVITY.map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#80CDE9', marginTop: 6, flexShrink: 0 }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ fontSize: 13, color: 'var(--cds-text-primary)' }}>{a.text}</span>
                    <span style={{ fontSize: 12, color: '#8896A0' }}>{a.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <button style={{
              width: '100%', height: 36, marginTop: 16, border: '1px solid #3D464D', borderRadius: 4, background: 'none',
              color: '#8896A0', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
            }}>
              Ver tudo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
