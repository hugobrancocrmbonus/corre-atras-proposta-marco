import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tag } from '../Tag'

const meta: Meta<typeof Tag> = {
  title: 'Componentes/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Etiqueta de status com variantes visuais. Usada nos Macrocards para indicar estado do agente.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    variant: {
      control: 'radio',
      options: ['success', 'warning', 'error', 'neutral'],
      table: { defaultValue: { summary: 'success' } },
    },
  },
}

export default meta
type Story = StoryObj<typeof Tag>

export const Success: Story = {
  name: 'Success',
  args: { label: 'Ativo', variant: 'success' },
}

export const Warning: Story = {
  name: 'Warning',
  args: { label: 'Em análise', variant: 'warning' },
}

export const Error: Story = {
  name: 'Error',
  args: { label: 'Inativo', variant: 'error' },
}

export const AllVariants: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Tag label="Ativo" variant="success" />
      <Tag label="Em análise" variant="warning" />
      <Tag label="Inativo" variant="error" />
      <Tag label="Neutro" variant="neutral" />
    </div>
  ),
}
