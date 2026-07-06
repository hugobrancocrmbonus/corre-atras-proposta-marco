import { useState } from 'react'
import { Tabs }        from '@ds/Tabs/Tabs'
import { Macrocard }   from '@ds/Macrocard/Macrocard'
import {
  ClientDetailDrawer,
  PerfilPill,
  VencimentoPill,
  type ExpectedClient,
} from '../components/ClientDetailDrawer'
import { PilotoTab } from './PilotoTab'

const B = import.meta.env.BASE_URL

// ── mock data: clientes esperados esta semana ─────────────────────────────────

function buildHistorico(categoria: string): ExpectedClient['historico'] {
  return {
    comprasNaMarca: 12,
    frequencia: 'A cada ~5 meses',
    ticketHistorico: 'R$1.180,00',
    ultimaCompraData: '08/2025',
    categoriaPreferida: categoria,
    lojaPreferida: 'Iguatemi SP',
  }
}

function buildDica(categoria: string): string {
  return `Esse é um cliente de alto valor. Vale um atendimento dedicado para reconquistá-lo. Apresente as novidades de ${categoria.toLowerCase()} com atenção.`
}

const EXPECTED_CLIENTS: ExpectedClient[] = [
  { id: 1,  nome: 'Mariana Cunha',    telefone: '11 9****-5678', perfil: 'Platinum', ultimaCompra: '01-07-2023', diasAusente: '352 dias ausente', categoria: 'Bolsas',            padrao: 'Cliente valioso', bonus: 'R$250,00', minResgate: 'R$500,00', vencimento: 'Vence semana',   vencimentoLevel: 'urgent', historico: buildHistorico('Bolsas'),            dica: buildDica('Bolsas') },
  { id: 2,  nome: 'Ricardo Oliveira', telefone: '11 9****-6789', perfil: 'Platinum', ultimaCompra: '15-08-2023', diasAusente: '307 dias',          categoria: 'Alfaiataria',       padrao: 'Cliente valioso', bonus: 'R$250,00', minResgate: 'R$500,00', vencimento: 'Vence em 2 dias', vencimentoLevel: 'soon',   historico: buildHistorico('Alfaiataria'),       dica: buildDica('Alfaiataria') },
  { id: 3,  nome: 'Isabela Costa',    telefone: '11 9****-7890', perfil: 'Platinum', ultimaCompra: '20-09-2023', diasAusente: '271 dias',          categoria: 'Vestidos casuais',  padrao: 'Cliente valioso', bonus: 'R$250,00', minResgate: 'R$500,00', vencimento: 'Vence em 2 dias', vencimentoLevel: 'soon',   historico: buildHistorico('Vestidos casuais'),  dica: buildDica('vestidos casuais') },
  { id: 4,  nome: 'Gustavo Pereira',  telefone: '11 9****-8901', perfil: 'Platinum', ultimaCompra: '05-10-2023', diasAusente: '256 dias',          categoria: 'Bolsas',            padrao: 'Cliente valioso', bonus: 'R$250,00', minResgate: 'R$500,00', vencimento: 'Vence em 2 dias', vencimentoLevel: 'soon',   historico: buildHistorico('Bolsas'),            dica: buildDica('Bolsas') },
  { id: 5,  nome: 'Beatriz Souza',    telefone: '11 9****-9012', perfil: 'Platinum', ultimaCompra: '10-11-2023', diasAusente: '220 dias',          categoria: 'Alfaiataria',       padrao: 'Cliente valioso', bonus: 'R$250,00', minResgate: 'R$500,00', vencimento: 'Vence em 2 dias', vencimentoLevel: 'soon',   historico: buildHistorico('Alfaiataria'),       dica: buildDica('Alfaiataria') },
  { id: 6,  nome: 'Felipe Rocha',     telefone: '11 9****-0123', perfil: 'Platinum', ultimaCompra: '25-11-2023', diasAusente: '205 dias',          categoria: 'Vestidos casuais',  padrao: 'Cliente valioso', bonus: 'R$250,00', minResgate: 'R$500,00', vencimento: 'Vence em 2 dias', vencimentoLevel: 'soon',   historico: buildHistorico('Vestidos casuais'),  dica: buildDica('vestidos casuais') },
  { id: 7,  nome: 'Amanda Castro',    telefone: '11 9****-1234', perfil: 'Gold',     ultimaCompra: '01-12-2023', diasAusente: '199 dias',          categoria: 'Vestidos casuais',  padrao: 'Cliente valioso', bonus: 'R$200,00', minResgate: 'R$500,00', vencimento: 'Vence em 3 dias', vencimentoLevel: 'normal', historico: buildHistorico('Vestidos casuais'),  dica: buildDica('vestidos casuais') },
  { id: 8,  nome: 'Lucas Martins',    telefone: '11 9****-2345', perfil: 'Gold',     ultimaCompra: '10-01-2024', diasAusente: '159 dias',          categoria: 'Alfaiataria',       padrao: 'Cliente valioso', bonus: 'R$200,00', minResgate: 'R$500,00', vencimento: 'Vence em 3 dias', vencimentoLevel: 'normal', historico: buildHistorico('Alfaiataria'),       dica: buildDica('Alfaiataria') },
  { id: 9,  nome: 'Carolina Dias',    telefone: '11 9****-3456', perfil: 'Silver',   ultimaCompra: '15-01-2024', diasAusente: '154 dias',          categoria: 'Bolsas',            padrao: 'Cliente valioso', bonus: 'R$150,00', minResgate: 'R$500,00', vencimento: 'Vence em 3 dias', vencimentoLevel: 'normal', historico: buildHistorico('Bolsas'),            dica: buildDica('Bolsas') },
  { id: 10, nome: 'Eduardo Santos',   telefone: '11 9****-4567', perfil: 'Silver',   ultimaCompra: '20-02-2024', diasAusente: '118 dias',          categoria: 'Bolsas',            padrao: 'Cliente valioso', bonus: 'R$150,00', minResgate: 'R$500,00', vencimento: 'Vence em 3 dias', vencimentoLevel: 'normal', historico: buildHistorico('Bolsas'),            dica: buildDica('Bolsas') },
]

const TABS = [
  { id: 'visao-geral', label: 'Visão geral' },
  { id: 'campanhas',   label: 'Campanhas' },
  { id: 'piloto',      label: 'Piloto Corre atrás' },
]

const SUBTITLES: Record<string, string> = {
  'visao-geral': 'Estes clientes têm bônus ativo para usar aqui. No caixa, o cliente informa o telefone e o bônus aparece.',
  'campanhas':   'Descreva quem você quer trazer de volta e a IA monta o plano.',
  'piloto':      'A inteligência contata quem está voltando dentro das regras que você aprovou. Você supervisiona e ajusta — não aprova um a um.',
}

// ── Campanhas tab: chat + AI proposal + lista de ações ─────────────────────────

interface Campaign {
  id: string
  name: string
  lojas: number
  bonusPercent: string
  bonusMin: string
  bonusMax: string
  volume: number
  inativoMin: string
  inativoMax: string
  status: 'Ativada' | 'Desativada'
}

const MOCK_CAMPAIGNS: Campaign[] = [
  { id: '4321', name: 'Última chance – Corre atrás', lojas: 12, bonusPercent: '20%', bonusMin: 'R$200,00', bonusMax: 'R$400,00', volume: 50,  inativoMin: '7 meses',  inativoMax: '14 meses', status: 'Ativada' },
  { id: '2109', name: 'Campanha de maio',             lojas: 34, bonusPercent: '40%', bonusMin: 'R$100,00', bonusMax: 'R$200,00', volume: 100, inativoMin: '10 meses', inativoMax: '24 meses', status: 'Desativada' },
]

interface AiPlan {
  prompt: string
  premissas: string[]
  segmentos: { label: string; count: number }[]
  activeSegment: string
  planTitle: string
  bonus: string
  minimo: string
  validade: string
  mensagem: string
  clientesElegiveis: { nome: string; ultimaCompra: string; padrao: string }[]
}

function buildAiPlan(prompt: string): AiPlan {
  return {
    prompt,
    premissas: ['Um envio por cliente', 'Sem bônus ativo', 'Blocklist do Corre atrás', 'Loja preferida', 'Sumidos + 8 meses'],
    segmentos: [{ label: 'Platinum', count: 12 }, { label: 'Gold', count: 8 }, { label: 'Silver', count: 4 }],
    activeSegment: 'Platinum',
    planTitle: 'Recuperação - Alfaiataria + 8 meses',
    bonus: 'R$ 350,00',
    minimo: 'R$ 500,00',
    validade: '7 dias',
    mensagem: 'Ooi, Mariana! Aqui é da Vivara Morumbi e temos presente para você: um bônus de até R$247,00!\n\nFaz um tempão que você não compra conosco e queremos muito te receber novamente na loja. Que tal conhecer a nossa coleção?\n\n*consulte termos de uso em loja.',
    clientesElegiveis: [
      { nome: 'Mariana Cunha',    ultimaCompra: '01-07-2023', padrao: 'Bolsas - Cliente valioso' },
      { nome: 'Ricardo Oliveira', ultimaCompra: '15-08-2023', padrao: 'Alfaiataria - Cliente valioso' },
      { nome: 'Isabela Costa',    ultimaCompra: '20-09-2023', padrao: 'Vestidos casuais - Cliente valioso' },
    ],
  }
}

const CHAT_SUGGESTIONS = ['Sumidos há + 8 meses', 'Clientes de vestido', 'Alto valor inativo']

function PlanPromptInput({ onSubmit }: { onSubmit: (text: string) => void }) {
  const [value, setValue] = useState('')
  const hasText = value.trim().length > 0

  function submit(text: string) {
    if (!text.trim()) return
    onSubmit(text.trim())
    setValue('')
  }

  return (
    <div style={{ width: '100%' }}>
      <div style={{
        borderRadius: 26, border: '1px solid #3D464D', backgroundColor: '#1D2124',
        padding: 6, display: 'flex', alignItems: 'center', gap: 8,
        boxShadow: '0 10px 24px -6px rgba(0,0,0,0.3)',
      }}>
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); submit(value) } }}
          placeholder="Pergunte algo sobre o Agente IA..."
          style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 14, color: 'var(--cds-text-primary)', fontFamily: 'inherit', padding: '8px 12px' }}
        />
        <button
          onClick={() => submit(value)}
          disabled={!hasText}
          style={{
            width: 40, height: 40, borderRadius: 20, border: 'none', flexShrink: 0,
            backgroundColor: hasText ? '#FFBB40' : '#3D464D', color: hasText ? '#0F1416' : '#8896A0',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: hasText ? 'pointer' : 'not-allowed',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
      <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
        {CHAT_SUGGESTIONS.map(s => (
          <button
            key={s}
            onClick={() => submit(s)}
            style={{
              borderRadius: 9999, border: '1px solid #FFBB40', padding: '7px 14px', fontSize: 13, fontWeight: 500,
              color: '#FFBB40', background: 'transparent', cursor: 'pointer', whiteSpace: 'nowrap',
            }}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}

function CampanhasTab() {
  const [plan, setPlan] = useState<AiPlan | null>(null)
  const [lastPrompt, setLastPrompt] = useState('')
  const [premissas, setPremissas] = useState<string[]>([])
  const [activeSegment, setActiveSegment] = useState('Platinum')

  function handleSubmit(prompt: string) {
    const p = buildAiPlan(prompt)
    setLastPrompt(prompt)
    setPlan(p)
    setPremissas(p.premissas)
    setActiveSegment(p.activeSegment)
  }

  function removePremissa(label: string) {
    setPremissas(prev => prev.filter(p => p !== label))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '24px 32px 32px 32px' }}>

      {/* prompt input */}
      <div style={{ maxWidth: 832, margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, paddingTop: plan ? 0 : 40, paddingBottom: plan ? 0 : 40 }}>
        {plan ? (
          <div style={{
            width: '100%', display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 16px',
            border: '1px solid #3D464D', borderRadius: 12, backgroundColor: '#1D2124',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8896A0" strokeWidth="1.5" style={{ flexShrink: 0 }}>
              <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            <span style={{ fontSize: 14, color: '#BCC6CD' }}>{lastPrompt}</span>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: 'var(--cds-text-primary)', margin: '0 0 8px', lineHeight: 1.38 }}>
              Diga quem você quer trazer de volta
            </h2>
            <p style={{ fontSize: 14, color: '#8896A0', lineHeight: 1.6, margin: 0 }}>
              Descreva em uma frase. A inteligência monta o público na sua loja, sugere a oferta e aplica os limites. Você aprova antes de enviar.
            </p>
          </div>
        )}
        {!plan && <PlanPromptInput onSubmit={handleSubmit} />}
      </div>

      {/* plano proposto */}
      {plan && (
        <div style={{
          borderRadius: 24, padding: '32px 40px',
          background: 'linear-gradient(rgb(20,23,26), rgb(20,23,26)) padding-box, linear-gradient(90deg, rgba(255,187,64,0.65), rgba(34,39,43,0.3)) border-box',
          border: '1px solid transparent',
        }}>
          <h3 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 700, color: 'var(--cds-text-primary)' }}>Plano proposto</h3>
          <p style={{ margin: '0 0 16px', fontSize: 14, color: '#BCC6CD', lineHeight: 1.5 }}>
            Oferta coerente com o ticket da marca, público dentro dos limites e sem dado sensível na mensagem. 2 clientes com telefone a confirmar ficaram de fora. Premissas aplicadas:
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
            {premissas.map(p => (
              <button
                key={p}
                onClick={() => removePremissa(p)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px',
                  backgroundColor: 'rgba(230,148,0,0.15)', border: '1px solid #FFBB40', borderRadius: 999,
                  color: '#FFBB40', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                {p}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 24 }}>
            {/* clientes elegíveis */}
            <div style={{ flex: 1, minWidth: 0, border: '1px solid #3D464D', borderRadius: 12, padding: 20, backgroundColor: '#14171A' }}>
              <h4 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600, color: 'var(--cds-text-primary)' }}>
                {plan.segmentos.reduce((s, seg) => s + seg.count, 0)} clientes elegíveis hoje
              </h4>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                {plan.segmentos.map(seg => (
                  <button
                    key={seg.label}
                    onClick={() => setActiveSegment(seg.label)}
                    style={{
                      height: 32, padding: '0 12px', borderRadius: 4, cursor: 'pointer', fontFamily: 'inherit',
                      fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap',
                      border: activeSegment === seg.label ? '1px solid #80CDE9' : '1px solid #3D464D',
                      backgroundColor: activeSegment === seg.label ? 'rgba(31,140,179,0.2)' : 'transparent',
                      color: activeSegment === seg.label ? '#80CDE9' : '#8896A0',
                    }}
                  >
                    {seg.count} {seg.label}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {plan.clientesElegiveis.map(c => (
                  <div key={c.nome} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #22272B' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--cds-text-primary)' }}>{c.nome}</span>
                      <span style={{ fontSize: 12, color: '#8896A0' }}>{c.ultimaCompra}</span>
                    </div>
                    <span style={{ fontSize: 12, color: '#8896A0', alignSelf: 'center' }}>{c.padrao}</span>
                  </div>
                ))}
              </div>
              <button style={{ marginTop: 12, background: 'none', border: 'none', color: '#FFBB40', fontSize: 13, cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}>
                Ver os {plan.segmentos.reduce((s, seg) => s + seg.count, 0)} clientes
              </button>
            </div>

            {/* mensagem preview */}
            <div style={{ flex: 1, minWidth: 0, border: '1px solid #3D464D', borderRadius: 12, padding: 20, backgroundColor: '#14171A' }}>
              <h4 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600, color: 'var(--cds-text-primary)' }}>{plan.planTitle}</h4>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                {[`Bônus: ${plan.bonus}`, `Mínimo: ${plan.minimo}`, `Validade ${plan.validade}`].map(t => (
                  <span key={t} style={{ height: 28, padding: '0 12px', display: 'inline-flex', alignItems: 'center', border: '1px solid #3D464D', borderRadius: 999, fontSize: 12, color: '#BCC6CD' }}>
                    {t}
                  </span>
                ))}
              </div>
              <div style={{
                backgroundColor: '#25BFB8', borderRadius: 16, padding: 16,
                boxShadow: '0px 8px 16px rgba(16,24,40,0.1), 0px 20px 40px rgba(16,24,40,0.16)',
              }}>
                <p style={{ margin: 0, fontSize: 14, lineHeight: '22px', color: '#121416', whiteSpace: 'pre-wrap' }}>{plan.mensagem}</p>
                <div style={{ borderTop: '1px solid rgba(0,0,0,0.2)', marginTop: 10, paddingTop: 10, textAlign: 'center' }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#003c02' }}>Ativar</span>
                </div>
              </div>
              <button style={{ marginTop: 12, background: 'none', border: 'none', color: '#FFBB40', fontSize: 13, cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}>
                Editar mensagem
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
            <button style={{ height: 40, padding: '0 20px', border: '1px solid #EEF0F2', borderRadius: 4, background: 'none', color: '#EEF0F2', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
              Ajustar
            </button>
            <button style={{ height: 40, padding: '0 20px', border: 'none', borderRadius: 4, backgroundColor: '#E69400', color: '#14171A', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
              Aprovar e criar ação
            </button>
          </div>
        </div>
      )}

      {plan && (
        <div style={{ maxWidth: 832, margin: '0 auto', width: '100%' }}>
          <PlanPromptInput onSubmit={handleSubmit} />
        </div>
      )}

      {/* lista de ações */}
      <div>
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--cds-text-primary)', margin: '0 0 4px' }}>Lista de ações</h2>
          <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--cds-text-secondary)', margin: 0 }}>Lista de ações criadas com o Agente Corre Atrás</p>
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
          <div style={{ flex: 1, display: 'flex' }}>
            <input
              placeholder="Busca"
              style={{ flex: 1, height: 40, padding: '0 16px', backgroundColor: '#22272B', border: '1px solid #58656F', borderRight: 'none', borderRadius: '4px 0 0 4px', color: 'var(--cds-text-primary)', fontSize: 14, outline: 'none', fontFamily: 'inherit' }}
            />
            <div style={{ width: 40, height: 40, backgroundColor: '#22272B', border: '1px solid #58656F', borderRadius: '0 4px 4px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9eaab3" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </div>
          </div>
          <button style={{ height: 40, padding: '0 12px', display: 'flex', alignItems: 'center', gap: 8, border: '1px solid var(--cds-text-primary)', borderRadius: 4, backgroundColor: 'transparent', color: 'var(--cds-text-primary)', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Filtro
          </button>
          <button style={{ height: 40, padding: '0 12px', display: 'flex', alignItems: 'center', gap: 8, border: 'none', borderRadius: 4, backgroundColor: '#E69400', color: '#14171A', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Criar ação
          </button>
        </div>

        <div style={{ overflowX: 'auto', borderRadius: '8px 8px 0 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1100 }}>
            <thead>
              <tr>
                {['ID','Campanha','Qtd. de lojas','% bônus','Bônus mín.','Bônus máx.','Vol. disparos/loja/dia','Período mín.','Período máx.','Status',''].map((col, i) => (
                  <th key={i} style={{
                    padding: '16px 16px', textAlign: 'left', fontSize: 12, fontWeight: 500, lineHeight: '16px',
                    color: 'var(--cds-text-secondary)', whiteSpace: 'nowrap', backgroundColor: '#22272B',
                    borderRadius: i === 0 ? '8px 0 0 0' : i === 9 ? '0 8px 0 0' : 0,
                  }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_CAMPAIGNS.map(c => (
                <tr key={c.id}>
                  {[c.id, c.name, c.lojas, c.bonusPercent, c.bonusMin, c.bonusMax, c.volume, c.inativoMin, c.inativoMax].map((v, i) => (
                    <td key={i} style={{ padding: '0 16px', fontSize: 12, fontWeight: i === 1 ? 500 : 400, lineHeight: '64px', color: 'var(--cds-text-primary)', whiteSpace: 'nowrap', borderBottom: '1px solid var(--cds-border-subtle)', height: 64 }}>
                      {v}
                    </td>
                  ))}
                  <td style={{ padding: '0 16px', fontSize: 12, borderBottom: '1px solid var(--cds-border-subtle)', height: 64 }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 500, color: c.status === 'Ativada' ? '#81D147' : '#DD3C3C' }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'currentColor', flexShrink: 0 }} />
                      {c.status}
                    </span>
                  </td>
                  <td style={{ padding: '0 16px', textAlign: 'center', borderBottom: '1px solid var(--cds-border-subtle)', height: 64 }}>
                    <button style={{ background: 'none', border: 'none', padding: 0, fontSize: 12, color: '#80CDE9', cursor: 'pointer', fontWeight: 400 }}>
                      Ver detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ── Visão geral tab ──────────────────────────────────────────────────────────

function VisaoGeralTab() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedClient, setSelectedClient] = useState<ExpectedClient | null>(null)

  const filtered = EXPECTED_CLIENTS.filter(c =>
    c.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.categoria.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const vencemEm2Dias = EXPECTED_CLIENTS.filter(c => c.vencimentoLevel === 'soon').length
  const vencemEm3Dias = EXPECTED_CLIENTS.filter(c => c.vencimentoLevel === 'normal').length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '24px 32px 32px 32px' }}>

      {/* Macrocard — resultados do período */}
      <Macrocard
        title="Resultados dos últimos 90 dias"
        tagLabel="Rodou às 9h02 · 50 clientes selecionados"
        cards={[
          { title: 'Enviados',     value: '114', change: '00%', iconSrc: `${B}icons/icon-message.png` },
          { title: 'Ativados',     value: '24',  change: '00%', iconSrc: `${B}icons/icon-calendar.png` },
          { title: 'Resgatados',   value: '3',   change: '00%', iconSrc: `${B}icons/icon-check.png` },
          { title: 'Selecionados', value: '100', change: '00%', iconSrc: `${B}icons/icon-target.png` },
        ]}
      />

      {/* Macrocard — clientes esperados esta semana */}
      <Macrocard
        variant="green"
        title="38 clientes esperados esta semana"
        subtitle="Os clientes abaixo ativaram o bônus e disseram que vêm. Cada um tem até 7 dias para usar aqui."
      >
        <div style={{ width: '100%' }} />
      </Macrocard>

      {/* search + filtro */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ flex: 1, display: 'flex' }}>
          <input
            placeholder="Busca"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ flex: 1, height: 40, padding: '0 16px', backgroundColor: '#22272B', border: '1px solid #58656F', borderRight: 'none', borderRadius: '4px 0 0 4px', color: 'var(--cds-text-primary)', fontSize: 14, outline: 'none', fontFamily: 'inherit' }}
          />
          <div style={{ width: 40, height: 40, backgroundColor: '#22272B', border: '1px solid #58656F', borderRadius: '0 4px 4px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9eaab3" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          </div>
        </div>
        <button style={{ height: 40, padding: '0 12px', display: 'flex', alignItems: 'center', gap: 8, border: '1px solid var(--cds-text-primary)', borderRadius: 4, backgroundColor: 'transparent', color: 'var(--cds-text-primary)', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          Filtro
        </button>
      </div>

      {/* info chips */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <span style={{ height: 32, padding: '0 12px', display: 'inline-flex', alignItems: 'center', backgroundColor: '#22272B', border: '1px solid #3D464D', borderRadius: 4, fontSize: 12, color: '#BCC6CD' }}>
          {vencemEm2Dias} clientes vencem em até 2 dias · {vencemEm3Dias} em até 3 dias
        </span>
        <span style={{ height: 32, padding: '0 12px', display: 'inline-flex', alignItems: 'center', backgroundColor: '#22272B', border: '1px solid #3D464D', borderRadius: 4, fontSize: 12, color: '#BCC6CD' }}>
          Ordenados por prioridade — quem tem mais valor e está mais perto de vencer aparece primeiro
        </span>
      </div>

      {/* table */}
      <div style={{ overflowX: 'auto', borderRadius: '8px 8px 0 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 900 }}>
          <thead>
            <tr>
              {['Cliente', 'Perfil', 'Última compra', 'Padrão de compra', 'Bônus', 'Vencimento', ''].map((col, i) => (
                <th key={i} style={{
                  padding: '16px 16px', textAlign: 'left', fontSize: 12, fontWeight: 500, lineHeight: '16px',
                  color: 'var(--cds-text-secondary)', whiteSpace: 'nowrap', backgroundColor: '#22272B',
                  borderRadius: i === 0 ? '8px 0 0 0' : i === 6 ? '0 8px 0 0' : 0,
                }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id}>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--cds-border-subtle)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--cds-text-primary)' }}>{c.nome}</span>
                    <span style={{ fontSize: 12, color: '#8896A0' }}>{c.telefone}</span>
                  </div>
                </td>
                <td style={{ padding: '0 16px', borderBottom: '1px solid var(--cds-border-subtle)', height: 64 }}>
                  <PerfilPill perfil={c.perfil} />
                </td>
                <td style={{ padding: '0 16px', fontSize: 13, color: 'var(--cds-text-primary)', whiteSpace: 'nowrap', borderBottom: '1px solid var(--cds-border-subtle)', height: 64 }}>
                  {c.ultimaCompra}<br /><span style={{ fontSize: 12, color: '#8896A0' }}>{c.diasAusente}</span>
                </td>
                <td style={{ padding: '0 16px', fontSize: 13, color: 'var(--cds-text-primary)', whiteSpace: 'nowrap', borderBottom: '1px solid var(--cds-border-subtle)', height: 64 }}>
                  {c.categoria}<br /><span style={{ fontSize: 12, color: '#8896A0' }}>{c.padrao}</span>
                </td>
                <td style={{ padding: '0 16px', fontSize: 13, fontWeight: 500, color: 'var(--cds-text-primary)', whiteSpace: 'nowrap', borderBottom: '1px solid var(--cds-border-subtle)', height: 64 }}>
                  {c.bonus}
                </td>
                <td style={{ padding: '0 16px', borderBottom: '1px solid var(--cds-border-subtle)', height: 64 }}>
                  <VencimentoPill label={c.vencimento} level={c.vencimentoLevel} />
                </td>
                <td style={{ padding: '0 16px', textAlign: 'center', borderBottom: '1px solid var(--cds-border-subtle)', height: 64 }}>
                  <button
                    onClick={() => setSelectedClient(c)}
                    style={{ background: 'none', border: 'none', padding: 0, fontSize: 12, color: '#80CDE9', cursor: 'pointer', fontWeight: 400 }}
                  >
                    Ver detalhes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination stub */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13, color: '#8896A0' }}>
        <span>Exibindo 1-10 de 1000 resultados</span>
        <div style={{ display: 'flex', gap: 4 }}>
          {[1, 2, 3, 4, 5].map(p => (
            <button key={p} style={{
              width: 32, height: 32, border: p === 1 ? '1px solid #ffbb40' : '1px solid var(--cds-border-subtle)', borderRadius: 4,
              background: p === 1 ? 'rgba(255,187,64,0.12)' : 'none', color: p === 1 ? '#ffbb40' : '#8896A0', cursor: 'pointer', fontSize: 13, fontWeight: p === 1 ? 600 : 400,
            }}>
              {p}
            </button>
          ))}
        </div>
      </div>

      <ClientDetailDrawer client={selectedClient} onClose={() => setSelectedClient(null)} />
    </div>
  )
}

// ── component ─────────────────────────────────────────────────────────────────

export function CorreAtrasPage() {
  const [activeTab, setActiveTab] = useState('visao-geral')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100%' }}>

      {/* ── Page header ──────────────────────────────────────────────── */}
      <div style={{ padding: '40px 32px 0 32px' }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, lineHeight: '1.3', letterSpacing: '0.56px' }}>
          <span style={{ color: '#FEBA63' }}>Corre Atrás:</span>{' '}
          <span style={{ color: 'var(--cds-text-primary)' }}>Vivara Iguatemi - São Paulo</span>
        </h1>
        <p style={{ margin: '4px 0 0 0', fontSize: 14, lineHeight: '1.8', color: '#c0c8ce' }}>
          {SUBTITLES[activeTab]}
        </p>
      </div>

      {/* ── Tabs ─────────────────────────────────────────────────────── */}
      <div style={{ padding: '0 32px' }}>
        <Tabs items={TABS} activeId={activeTab} onChange={setActiveTab} />
      </div>

      {activeTab === 'visao-geral' && <VisaoGeralTab />}
      {activeTab === 'campanhas'   && <CampanhasTab />}
      {activeTab === 'piloto'      && <PilotoTab />}
    </div>
  )
}
