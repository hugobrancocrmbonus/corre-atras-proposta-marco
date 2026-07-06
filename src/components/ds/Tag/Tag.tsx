type TagVariant = 'success' | 'warning' | 'error' | 'neutral' | 'brand'

export interface TagProps {
  label: string
  variant?: TagVariant
}

const VARIANT_STYLES: Record<TagVariant, { bg: string; border: string; color: string }> = {
  success: {
    bg: 'rgba(82,146,36,0.2)',
    border: '#ade187',
    color: '#ade187',
  },
  warning: {
    bg: 'rgba(230,148,0,0.15)',
    border: '#e69400',
    color: '#ffbb40',
  },
  error: {
    bg: 'rgba(220,53,53,0.15)',
    border: '#f87171',
    color: '#f87171',
  },
  neutral: {
    bg: 'rgba(47,55,60,0.4)',
    border: '#3d464d',
    color: '#eef0f2',
  },
  brand: {
    bg: 'rgba(255,165,0,0.12)',
    border: '#ffbb40',
    color: '#ffbb40',
  },
}

export function Tag({ label, variant = 'success' }: TagProps) {
  const s = VARIANT_STYLES[variant]
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: s.bg,
        border: `1px solid ${s.border}`,
        borderRadius: 4,
        padding: '0 12px',
        height: 40,
      }}
    >
      <span
        style={{
          fontSize: 12,
          fontWeight: 500,
          lineHeight: '16px',
          color: s.color,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {label}
      </span>
    </div>
  )
}
