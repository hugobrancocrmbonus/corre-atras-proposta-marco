import React from 'react'
import { DocumentationLayout } from '../layout'

function CodeBlock({ children, language = 'bash' }: { children: string; language?: string }) {
  return (
    <pre style={{
      backgroundColor: '#1e2427',
      border: '1px solid #353e45',
      borderRadius: 8,
      padding: '16px 20px',
      margin: 0,
      overflow: 'auto',
      fontFamily: 'monospace',
      fontSize: 13,
      lineHeight: '22px',
      color: '#f4f7fa',
    }}>
      <code>{children}</code>
    </pre>
  )
}

function Step({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          backgroundColor: '#ffbb40', color: '#121416',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 700, flexShrink: 0,
        }}>
          {number}
        </div>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#121416', fontFamily: 'Inter, sans-serif' }}>
          {title}
        </h3>
      </div>
      <div style={{ paddingLeft: 40 }}>{children}</div>
    </div>
  )
}

function InstallationContent() {
  return (
    <div style={{ maxWidth: 720, fontFamily: 'Inter, sans-serif', color: '#4a5568' }}>
      <h1 style={{ margin: '0 0 12px', fontSize: 28, fontWeight: 700, color: '#121416' }}>
        Guia de Instalação
      </h1>
      <p style={{ margin: '0 0 40px', fontSize: 15, lineHeight: '24px', color: '#6b7a85' }}>
        Como integrar o CarumDS ao seu projeto React.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <Step number={1} title="Instalar o pacote">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p style={{ margin: 0, fontSize: 14, color: '#6b7a85' }}>
              Via npm, yarn ou pnpm:
            </p>
            <CodeBlock language="bash">{`npm install @crmbonus/design-system`}</CodeBlock>
            <CodeBlock language="bash">{`yarn add @crmbonus/design-system`}</CodeBlock>
            <CodeBlock language="bash">{`pnpm add @crmbonus/design-system`}</CodeBlock>
          </div>
        </Step>

        <Step number={2} title="Importar os estilos globais">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p style={{ margin: 0, fontSize: 14, color: '#6b7a85' }}>
              No ponto de entrada da aplicação (<code style={{ fontFamily: 'monospace', fontSize: 13, backgroundColor: '#e8ecef', padding: '1px 6px', borderRadius: 4 }}>main.tsx</code> ou equivalente):
            </p>
            <CodeBlock language="tsx">{`import '@crmbonus/design-system/styles'`}</CodeBlock>
            <p style={{ margin: 0, fontSize: 13, color: '#8d9ba5' }}>
              Isso carrega as fontes, os tokens CSS (<code style={{ fontFamily: 'monospace', fontSize: 12 }}>--cds-*</code>, <code style={{ fontFamily: 'monospace', fontSize: 12 }}>--crm-*</code>) e o reset de base.
            </p>
          </div>
        </Step>

        <Step number={3} title="Usar os componentes">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p style={{ margin: 0, fontSize: 14, color: '#6b7a85' }}>
              Importe diretamente do pacote com suporte completo a TypeScript:
            </p>
            <CodeBlock language="tsx">{`import { Switch, TextInput, Macrocard } from '@crmbonus/design-system'

export function MyPage() {
  return (
    <Macrocard title="Meu componente">
      <Switch label="Ativar" />
      <TextInput label="Nome" value="" />
    </Macrocard>
  )
}`}</CodeBlock>
          </div>
        </Step>

        <Step number={4} title="Requisitos">
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: '24px', color: '#4a5568', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <li>React 18 ou superior</li>
            <li>TypeScript (opcional, mas recomendado)</li>
            <li>Tokens CSS nativos não requerem Tailwind</li>
          </ul>
        </Step>
      </div>

      <div style={{ marginTop: 48, padding: '16px 20px', backgroundColor: '#fffbf0', border: '1px solid #ffbb40', borderRadius: 8, fontSize: 13, color: '#6b7a85' }}>
        <strong style={{ color: '#e69400' }}>⚠ Em desenvolvimento</strong> — O pacote ainda não foi publicado no npm. Utilize referência local ou git por enquanto.
      </div>
    </div>
  )
}

export function InstallationGuide() {
  return (
    <DocumentationLayout genericDocumentationPage documentationStory={<InstallationContent />} />
  )
}
