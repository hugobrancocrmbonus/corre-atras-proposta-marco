import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from '../Textarea'

const meta: Meta<typeof Textarea> = {
  title: 'Componentes/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Área de texto multi-linha redimensionável. Mesma linguagem visual do TextInput. Borda amber no foco.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    minRows: { control: 'number', table: { defaultValue: { summary: '4' } } },
  },
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  name: 'Padrão',
  render: () => {
    const [v, setV] = useState('')
    return <Textarea label="Mensagem" value={v} onChange={setV} placeholder="Digite a mensagem..." />
  },
}

export const WithContent: Story = {
  name: 'Com conteúdo',
  render: () => {
    const [v, setV] = useState(
      'Ooi, {NOME}! Aqui é da {LOJA} e temos presente para você: um bônus de até R$ {VALORBONUS}!\n\nFaz um tempão que você não compra conosco e queremos muito te receber novamente na loja.'
    )
    return <Textarea label="Mensagem personalizada" value={v} onChange={setV} minRows={6} />
  },
}

export const Disabled: Story = {
  name: 'Desabilitado',
  render: () => (
    <Textarea
      label="Template padrão (somente leitura)"
      value="Ooi, {NOME}! Aqui é da {LOJA} e temos presente para você: um bônus exclusivo!"
      disabled
    />
  ),
}
