import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { TextInput } from '../TextInput'

const meta: Meta<typeof TextInput> = {
  title: 'Componentes/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Campo de texto com suporte a máscaras (percent, currency, integer, months, weeks). Altura 48px, borda amber no foco.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    mask: {
      control: 'radio',
      options: ['text', 'percent', 'currency', 'integer', 'months', 'weeks'],
      table: { defaultValue: { summary: 'text' } },
    },
    disabled: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    width: { control: 'text', table: { defaultValue: { summary: '140' } } },
  },
}

export default meta
type Story = StoryObj<typeof TextInput>

export const Default: Story = {
  name: 'Texto livre',
  render: () => {
    const [v, setV] = useState('')
    return <TextInput label="Nome" value={v} onChange={setV} placeholder="Digite aqui" />
  },
}

export const Percent: Story = {
  name: 'Máscara percent',
  render: () => {
    const [v, setV] = useState('20%')
    return <TextInput label="Percentual de bônus" value={v} onChange={setV} mask="percent" />
  },
}

export const Currency: Story = {
  name: 'Máscara currency',
  render: () => {
    const [v, setV] = useState('R$ 3.500,00')
    return <TextInput label="Valor máximo de bônus" value={v} onChange={setV} mask="currency" width={200} />
  },
}

export const Months: Story = {
  name: 'Máscara months',
  render: () => {
    const [v, setV] = useState('7 meses')
    return <TextInput label="Período mínimo de inatividade" value={v} onChange={setV} mask="months" width={200} />
  },
}

export const Disabled: Story = {
  name: 'Desabilitado',
  render: () => <TextInput label="Campo bloqueado" value="valor fixo" disabled width={200} />,
}

export const AllMasks: Story = {
  name: 'Todas as máscaras',
  render: () => {
    const [percent, setPercent] = useState('20%')
    const [currency, setCurrency] = useState('R$ 3.500,00')
    const [months, setMonths] = useState('7 meses')
    const [weeks, setWeeks] = useState('2 semanas')
    const [integer, setInteger] = useState('50')
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        <TextInput label="Percent" value={percent} onChange={setPercent} mask="percent" width={140} />
        <TextInput label="Currency" value={currency} onChange={setCurrency} mask="currency" width={180} />
        <TextInput label="Months" value={months} onChange={setMonths} mask="months" width={160} />
        <TextInput label="Weeks" value={weeks} onChange={setWeeks} mask="weeks" width={160} />
        <TextInput label="Integer" value={integer} onChange={setInteger} mask="integer" width={120} />
      </div>
    )
  },
}
