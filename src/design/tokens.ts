export const tokens = {
  colors: {
    primary: '#6D4AFE',
    primaryContrast: '#0B0620',
    success: '#17A34A',
    danger: '#DC2626',
    warning: '#D97706',
    muted: '#F5F5F5',
    surface: '#FFFFFF',
    text: '#0A0A0A',
    subtext: '#525252',
    accent: '#FDE68A',
  },
  radius: {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    pill: '9999px',
  },
  shadows: {
    card: '0 10px 40px rgba(109, 74, 254, 0.12)',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    '2xl': 32,
  },
  typography: {
    font: '"Inter", system-ui, sans-serif',
    h1: 'text-4xl md:text-5xl font-bold tracking-tight',
    h2: 'text-3xl font-semibold',
    h3: 'text-2xl font-semibold',
    body: 'text-base',
    small: 'text-sm',
  },
  motion: {
    fast: '150ms',
    normal: '300ms',
    easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
  },
} as const;

export type Tokens = typeof tokens;
