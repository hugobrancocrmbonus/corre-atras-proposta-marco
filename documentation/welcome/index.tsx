import React from 'react'
import { DocumentationLayout } from '../layout'

const B = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ fontWeight: 700, color: '#121416' }}>{children}</strong>
)

function WelcomeContent() {
  return (
    <div style={{ maxWidth: 720, fontFamily: 'Inter, sans-serif', color: '#4a5568' }}>
      <p style={{ margin: '0 0 8px', fontSize: 18, color: '#6b7a85' }}>Bem-vindo ao</p>
      <h1 style={{ margin: '0 0 40px', fontSize: 36, fontWeight: 700, color: '#121416', lineHeight: 1.2 }}>
        CarumDS — Design System
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontSize: 15, lineHeight: '26px' }}>
        <p style={{ margin: 0 }}>
          A CRM&Bonus atua com múltiplos produtos voltados para o mercado de benefícios e gestão de
          clientes. Com o crescimento do time e o aumento da superfície de produto, ficou claro que
          cada squad tomava decisões visuais de forma independente — gerando interfaces inconsistentes
          e retrabalho constante entre design e desenvolvimento.
        </p>
        <p style={{ margin: 0 }}>
          A decisão de construir um design system próprio veio da necessidade de ter uma{' '}
          <B>base técnica compartilhada</B> que refletisse a identidade visual da empresa e permitisse
          que novos produtos e funcionalidades fossem entregues com mais velocidade e menos fricção
          entre as disciplinas.
        </p>
        <p style={{ margin: 0 }}>
          O CarumDS é construído sobre <B>React 19</B> e <B>TypeScript</B>, estilizado com{' '}
          <B>tokens CSS nativos</B> (<code style={{ fontFamily: 'monospace', fontSize: 13, backgroundColor: '#e8ecef', padding: '1px 6px', borderRadius: 4 }}>--cds-*</code>{' '}
          e{' '}
          <code style={{ fontFamily: 'monospace', fontSize: 13, backgroundColor: '#e8ecef', padding: '1px 6px', borderRadius: 4 }}>--crm-*</code>),
          empacotado com <B>Vite</B> e documentado no <B>Storybook 10</B>.
        </p>
      </div>

      <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid #dde3e8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 13, color: '#a0adb7' }}>Mantido pelo time de produto · CRM&Bonus</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: '#a0adb7' }}>v0.1.0</span>
          <span style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: '#cbd3d9', display: 'inline-block' }} />
          <span style={{ fontSize: 13, color: '#a0adb7' }}>Em desenvolvimento</span>
        </div>
      </div>
    </div>
  )
}

export function Welcome() {
  return (
    <DocumentationLayout genericDocumentationPage documentationStory={<WelcomeContent />} />
  )
}
