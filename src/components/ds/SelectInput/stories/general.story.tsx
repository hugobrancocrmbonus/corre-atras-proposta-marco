import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { SelectInput } from '../SelectInput'

const REGION_OPTIONS = [
  { value: 'all', label: 'Todas as regiões' },
  { value: 'sp', label: 'São Paulo' },
  { value: 'rj', label: 'Rio de Janeiro' },
  { value: 'mg', label: 'Minas Gerais' },
]

const TEMPLATE_OPTIONS = [
  { value: 'padrao', label: 'Padrão CRM&Bonus' },
  { value: 'reativacao', label: 'Reativação de clientes' },
  { value: 'custom', label: 'Personalizado' },
]

const meta: Meta<typeof SelectInput> = {
  title: 'Componentes/SelectInput',
  component: SelectInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Select customizado com dropdown animado. Suporta label, helper e largura configurável.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text', table: { defaultValue: { summary: 'Selecionar' } } },
    width: { control: 'text', table: { defaultValue: { summary: '240' } } },
  },
}

export default meta
type Story = StoryObj<typeof SelectInput>

export const Default: Story = {
  name: 'Padrão',
  render: () => {
    const [v, setV] = useState('all')
    return <SelectInput label="Região" options={REGION_OPTIONS} value={v} onChange={setV} />
  },
}

export const Template: Story = {
  name: 'Template de mensagem',
  render: () => {
    const [v, setV] = useState('padrao')
    return <SelectInput label="Template" options={TEMPLATE_OPTIONS} value={v} onChange={setV} width="100%" />
  },
}

export const Unselected: Story = {
  name: 'Sem seleção',
  render: () => {
    const [v, setV] = useState('')
    return <SelectInput label="Agrupador" options={REGION_OPTIONS} value={v} onChange={setV} placeholder="Selecione uma região" />
  },
}
