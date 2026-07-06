import type { Meta, StoryObj } from '@storybook/react-vite'
import { CardReceitaIncremental } from '../CardReceitaIncremental'

const meta: Meta<typeof CardReceitaIncremental> = {
  title: 'Componentes/CardReceitaIncremental',
  component: CardReceitaIncremental,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Gráfico de onda SVG responsivo com histórico mensal de receita incremental. Área amber com gradiente, tooltip no hover e labels de mês que escalam com o container.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof CardReceitaIncremental>

export const Default: Story = {
  name: 'Padrão',
  render: () => (
    <div style={{ width: '100%', maxWidth: 800 }}>
      <CardReceitaIncremental />
    </div>
  ),
}

export const Narrow: Story = {
  name: 'Container estreito',
  render: () => (
    <div style={{ width: 360 }}>
      <CardReceitaIncremental />
    </div>
  ),
}

export const Wide: Story = {
  name: 'Container largo',
  render: () => (
    <div style={{ width: '100%' }}>
      <CardReceitaIncremental />
    </div>
  ),
}
