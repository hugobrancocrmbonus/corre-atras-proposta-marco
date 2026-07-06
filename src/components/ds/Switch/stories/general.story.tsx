import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Switch } from '../Switch'

const meta: Meta<typeof Switch> = {
  title: 'Componentes/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Controle de alternância binária (ligado/desligado). Suporta label opcional e estado controlado.',
      },
    },
  },
  argTypes: {
    label: {
      description: 'Texto exibido ao lado do switch',
      control: 'text',
      table: { defaultValue: { summary: 'undefined' } },
    },
    checked: {
      description: 'Estado atual do switch',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    onChange: { action: 'changed' },
  },
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
  name: 'Desativado',
  args: { label: 'Campanha Desativada', checked: false },
}

export const Active: Story = {
  name: 'Ativado',
  args: { label: 'Campanha Ativa', checked: true },
}

export const WithoutLabel: Story = {
  name: 'Sem label',
  args: { checked: false },
}

export const Interactive: Story = {
  name: 'Interativo',
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <Switch
        label={checked ? 'Campanha Ativa' : 'Campanha Desativada'}
        checked={checked}
        onChange={setChecked}
      />
    )
  },
}
