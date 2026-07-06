/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // CarumDS tokens — mapped via CSS variables
        // Semantic: background
        'bg-primary':    'var(--color-bg-primary)',
        'bg-secondary':  'var(--color-bg-secondary)',
        'bg-tertiary':   'var(--color-bg-tertiary)',
        'bg-overlay':    'var(--color-bg-overlay)',
        // Semantic: surface
        'surface-1':     'var(--color-surface-1)',
        'surface-2':     'var(--color-surface-2)',
        'surface-3':     'var(--color-surface-3)',
        // Semantic: border
        'border-subtle': 'var(--color-border-subtle)',
        'border-default':'var(--color-border-default)',
        'border-strong': 'var(--color-border-strong)',
        // Semantic: text
        'text-primary':  'var(--color-text-primary)',
        'text-secondary':'var(--color-text-secondary)',
        'text-tertiary': 'var(--color-text-tertiary)',
        'text-disabled': 'var(--color-text-disabled)',
        'text-inverse':  'var(--color-text-inverse)',
        // Semantic: brand
        'brand-default': 'var(--color-brand-default)',
        'brand-hover':   'var(--color-brand-hover)',
        'brand-subtle':  'var(--color-brand-subtle)',
        // Semantic: status
        'status-success':'var(--color-status-success)',
        'status-warning':'var(--color-status-warning)',
        'status-error':  'var(--color-status-error)',
        'status-info':   'var(--color-status-info)',
        'status-success-subtle': 'var(--color-status-success-subtle)',
        'status-warning-subtle': 'var(--color-status-warning-subtle)',
        'status-error-subtle':   'var(--color-status-error-subtle)',
        'status-info-subtle':    'var(--color-status-info-subtle)',
      },
      fontFamily: {
        sans: ['var(--font-family-base)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-family-mono)', 'monospace'],
      },
      fontSize: {
        'ds-xs':   ['var(--font-size-xs)',   { lineHeight: 'var(--line-height-xs)' }],
        'ds-sm':   ['var(--font-size-sm)',   { lineHeight: 'var(--line-height-sm)' }],
        'ds-base': ['var(--font-size-base)', { lineHeight: 'var(--line-height-base)' }],
        'ds-md':   ['var(--font-size-md)',   { lineHeight: 'var(--line-height-md)' }],
        'ds-lg':   ['var(--font-size-lg)',   { lineHeight: 'var(--line-height-lg)' }],
        'ds-xl':   ['var(--font-size-xl)',   { lineHeight: 'var(--line-height-xl)' }],
        'ds-2xl':  ['var(--font-size-2xl)',  { lineHeight: 'var(--line-height-2xl)' }],
      },
      spacing: {
        'ds-1':  'var(--spacing-1)',
        'ds-2':  'var(--spacing-2)',
        'ds-3':  'var(--spacing-3)',
        'ds-4':  'var(--spacing-4)',
        'ds-5':  'var(--spacing-5)',
        'ds-6':  'var(--spacing-6)',
        'ds-8':  'var(--spacing-8)',
        'ds-10': 'var(--spacing-10)',
        'ds-12': 'var(--spacing-12)',
        'ds-16': 'var(--spacing-16)',
      },
      borderRadius: {
        'ds-sm':   'var(--radius-sm)',
        'ds-base': 'var(--radius-base)',
        'ds-md':   'var(--radius-md)',
        'ds-lg':   'var(--radius-lg)',
        'ds-xl':   'var(--radius-xl)',
        'ds-full': 'var(--radius-full)',
      },
    },
  },
  plugins: [],
}
