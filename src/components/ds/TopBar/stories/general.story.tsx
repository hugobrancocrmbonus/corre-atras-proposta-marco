import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { TopBar } from '../TopBar'

const meta: Meta<typeof TopBar> = {
  title: 'Componentes/TopBar',
  component: TopBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Barra de navegação superior. Contém logo CRMBonus, breadcrumb, botão de versão antiga, BrandSelector e Avatar.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#121416' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof TopBar>

export const Default: Story = {
  name: 'Padrão',
  args: {
    breadcrumb: [{ label: 'Página inicial' }, { label: 'Agentes IA' }],
    showLegacyButton: true,
    brandName: 'Vivara',
    brandLogoSrc: 'https://www.figma.com/api/mcp/asset/ed5eb695-3595-48dd-93e0-e44987eaafd9',
    avatarAlt: 'HB',
  },
}

export const WithDeepBreadcrumb: Story = {
  name: 'Breadcrumb profundo',
  args: {
    breadcrumb: [
      { label: 'Página inicial' },
      { label: 'Agentes IA', onClick: () => {} },
      { label: 'Corre Atrás' },
    ],
    showLegacyButton: true,
    brandName: 'Vivara',
    avatarAlt: 'HB',
  },
}

export const LightMode: Story = {
  name: 'Light mode',
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#f4f7fa' }}>
        <Story />
      </div>
    ),
  ],
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <TopBar
        theme="light"
        breadcrumb={[{ label: 'Página inicial' }, { label: 'Agentes IA' }]}
        showLegacyButton
        brandName="Vivara"
        avatarAlt="HB"
        onChangeBrand={() => setOpen(!open)}
      />
    )
  },
}
