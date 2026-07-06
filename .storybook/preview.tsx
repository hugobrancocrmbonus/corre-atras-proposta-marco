import type { Preview } from '@storybook/react-vite'
import { useEffect } from 'react'
import '../src/tokens/index.css'
import '../src/index.css'

const DARK_BG = '#121416'
const LIGHT_BG = '#f4f7fa'

function resolveBg(globals: Record<string, unknown>): string {
  // Storybook can return the name string OR an object with .value
  const raw = globals?.backgrounds
  if (!raw) return DARK_BG
  if (typeof raw === 'string') return raw === 'light' ? LIGHT_BG : DARK_BG
  if (typeof raw === 'object' && raw !== null) {
    const val = (raw as Record<string, unknown>).value
    if (typeof val === 'string') return val
  }
  return DARK_BG
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark',  value: DARK_BG  },
        { name: 'light', value: LIGHT_BG },
      ],
    },
    layout: 'fullscreen',
  },
  decorators: [
    (Story, context) => {
      const bg = resolveBg(context.globals as Record<string, unknown>)
      const isDark = bg !== LIGHT_BG

      useEffect(() => {
        // Cobre elementos portalizados (fixed/absolute) fora do wrapper
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
      }, [isDark])

      return (
        <div
          data-theme={isDark ? 'dark' : 'light'}
          style={{ backgroundColor: bg, minHeight: '100vh', padding: 32 }}
        >
          <Story />
        </div>
      )
    },
  ],
}

export default preview
