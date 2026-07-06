import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Selector } from '../Selector'

const meta: Meta<typeof Selector> = {
  title: 'Componentes/Selector',
  component: Selector,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Card de seleção de marca. Exibe logo, nome e CS responsável. Usado no BrandDrawer.',
      },
    },
  },
  argTypes: {
    brandName: { control: 'text', table: { defaultValue: { summary: 'Nome da marca' } } },
    csResponsavel: { control: 'text', table: { defaultValue: { summary: 'Nome do CS responsável' } } },
    state: {
      control: 'radio',
      options: ['default', 'pressed'],
      table: { defaultValue: { summary: 'default' } },
    },
    onClick: { action: 'clicked' },
  },
}

export default meta
type Story = StoryObj<typeof Selector>

export const Default: Story = {
  name: 'Padrão',
  args: { brandName: 'Vivara', csResponsavel: 'Ana Souza', state: 'default' },
}

export const Pressed: Story = {
  name: 'Selecionado',
  args: { brandName: 'Vivara', csResponsavel: 'Ana Souza', state: 'pressed' },
}

export const List: Story = {
  name: 'Lista de marcas',
  render: () => {
    const [selected, setSelected] = useState<string | null>(null)
    const brands = [
      { id: '1', name: 'Vivara', cs: 'Ana Souza' },
      { id: '2', name: 'Corello', cs: 'Bruno Lima' },
      { id: '3', name: 'Shoulder', cs: 'Carla Dias' },
    ]
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 440 }}>
        {brands.map(b => (
          <Selector
            key={b.id}
            brandName={b.name}
            csResponsavel={b.cs}
            state={selected === b.id ? 'pressed' : 'default'}
            onClick={() => setSelected(b.id)}
          />
        ))}
      </div>
    )
  },
}
