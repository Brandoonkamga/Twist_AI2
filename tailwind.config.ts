import type { Config } from 'tailwindcss';
import { tokens } from './src/design/tokens';

const config: Config = {
  darkMode: ['class'],
  content: ['index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: tokens.colors.primary,
        primaryContrast: tokens.colors.primaryContrast,
        success: tokens.colors.success,
        danger: tokens.colors.danger,
        warning: tokens.colors.warning,
        muted: tokens.colors.muted,
        text: tokens.colors.text,
        subtext: tokens.colors.subtext,
      },
      borderRadius: {
        sm: tokens.radius.sm,
        DEFAULT: tokens.radius.md,
        lg: tokens.radius.lg,
        pill: tokens.radius.pill,
      },
      boxShadow: {
        card: tokens.shadows.card,
      },
      transitionDuration: {
        fast: tokens.motion.fast,
        normal: tokens.motion.normal,
      },
      fontFamily: {
        sans: tokens.typography.font.split(',')[0]?.replace(/"/g, '') ?? 'Inter',
      },
    },
  },
  plugins: [],
};

export default config;
