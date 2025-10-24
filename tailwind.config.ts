import type { Config } from 'tailwindcss';
import { tokens } from './src/design/tokens';

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: tokens.colors.primary,
        'primary-foreground': tokens.colors.primaryContrast,
        background: tokens.colors.background,
        foreground: tokens.colors.text,
        muted: tokens.colors.muted,
        'muted-foreground': tokens.colors.subtext,
        success: tokens.colors.success,
        danger: tokens.colors.danger,
        warning: tokens.colors.warning,
        border: tokens.colors.border
      },
      fontFamily: {
        sans: [tokens.typography.font, 'sans-serif']
      },
      borderRadius: {
        lg: tokens.radius.lg,
        md: tokens.radius.md,
        sm: tokens.radius.sm,
        pill: tokens.radius.pill
      },
      boxShadow: {
        card: tokens.shadows.card
      },
      transitionDuration: {
        fast: tokens.motion.fast,
        normal: tokens.motion.normal
      },
      transitionTimingFunction: {
        ease: tokens.motion.easing
      }
    }
  }
};

export default config;
