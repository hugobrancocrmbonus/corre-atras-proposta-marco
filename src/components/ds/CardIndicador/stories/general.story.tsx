import type { Meta, StoryObj } from '@storybook/react-vite'
import { CardIndicador } from '../CardIndicador'

const meta: Meta<typeof CardIndicador> = {
  title: 'Componentes/CardIndicador',
  component: CardIndicador,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Card de métrica individual. Exibe título, valor e variação percentual. Usado dentro do Macrocard.',
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    value: { control: 'text' },
    change: { control: 'text', table: { defaultValue: { summary: '00%' } } },
  },
}

export default meta
type Story = StoryObj<typeof CardIndicador>

export const Default: Story = {
  name: 'Padrão',
  args: { title: 'Clientes alcançados', value: '12.483', change: '+8,3%' },
}

export const Currency: Story = {
  name: 'Valor monetário',
  args: { title: 'Receita incremental', value: 'R$ 3,08M', change: '+5,4%' },
}

export const Group: Story = {
  name: 'Grupo de cards',
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <CardIndicador title="Clientes alcançados" value="12.483" change="+8,3%" />
      <CardIndicador title="Retorno médio" value="R$ 247" change="+12,1%" />
      <CardIndicador title="Receita incremental" value="R$ 3,08M" change="+5,4%" />
    </div>
  ),
}
