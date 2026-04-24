/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        display: ['"Syne"', 'sans-serif'],
      },
      colors: {
        bg: {
          base:    '#0c0c0e',
          surface: '#111115',
          raised:  '#18181d',
          border:  '#222228',
        },
        gold: {
          DEFAULT: '#c8a96e',
          dim:     '#8a7040',
          subtle:  '#1e1a0e',
        },
        ink: {
          primary:   '#f0ede8',
          secondary: '#a0a0ac',
          muted:     '#55555f',
        },
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
      },
      animation: {
        'fade-up':   'fade-up 0.4s ease both',
        'fade-in':   'fade-in 0.3s ease both',
        'spin-slow': 'spin-slow 1s linear infinite',
        shimmer:     'shimmer 1.4s ease infinite',
      },
    },
  },
  plugins: [],
}
