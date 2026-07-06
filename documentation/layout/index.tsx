import React from 'react'

interface DocumentationLayoutProps {
  genericDocumentationPage?: boolean
  title?: string
  description?: string
  version?: string
  children?: React.ReactNode
  documentationStory?: React.ReactNode
}

export function DocumentationLayout({
  genericDocumentationPage,
  title,
  description,
  version,
  children,
  documentationStory,
}: DocumentationLayoutProps) {
  const content = documentationStory ?? children

  if (genericDocumentationPage) {
    return (
      <div style={{ backgroundColor: '#f4f7fa', minHeight: '100vh', padding: '48px 64px' }}>
        {content}
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#f4f7fa', minHeight: '100vh', padding: '48px 64px' }}>
      <div style={{ maxWidth: 800 }}>
        {(title || description) && (
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
              {title && (
                <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: '#121416', fontFamily: 'Inter, sans-serif' }}>
                  {title}
                </h1>
              )}
              {version && (
                <span style={{ fontSize: 14, fontWeight: 500, color: '#6b7a85', fontFamily: 'Inter, sans-serif' }}>
                  ({version})
                </span>
              )}
            </div>
            {description && (
              <p style={{ margin: 0, fontSize: 15, lineHeight: '24px', color: '#4a5568', fontFamily: 'Inter, sans-serif' }}>
                {description}
              </p>
            )}
          </div>
        )}
        {content}
      </div>
    </div>
  )
}
