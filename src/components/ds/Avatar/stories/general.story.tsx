import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar } from '../Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Componentes/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Avatar do usuário com fallback de iniciais. Exibe chevron de dropdown. Usado na TopBar.',
      },
    },
  },
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text', table: { defaultValue: { summary: 'Avatar' } } },
    onClick: { action: 'clicked' },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const WithInitials: Story = {
  name: 'Com iniciais (fallback)',
  args: { alt: 'Hugo Branco' },
}

export const Clickable: Story = {
  name: 'Clicável',
  args: { alt: 'HB', onClick: () => {} },
}
