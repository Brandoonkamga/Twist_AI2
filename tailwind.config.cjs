const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#6D4AFE',
        primaryContrast: '#0B0620',
        success: '#17A34A',
        danger: '#DC2626',
        warning: '#D97706',
        muted: '#F5F5F5',
        text: '#0A0A0A',
        subtext: '#525252',
      },
      boxShadow: {
        card: '0 6px 24px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        '2xl': '1.5rem',
      },
      transitionDuration: {
        normal: '300ms',
      },
      transitionTimingFunction: {
        friendly: 'cubic-bezier(0.2,0.8,0.2,1)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
