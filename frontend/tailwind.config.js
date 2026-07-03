/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: '#050816',
        card: 'rgba(255, 255, 255, 0.02)',
        'card-hover': 'rgba(255, 255, 255, 0.035)',
        border: 'rgba(255, 255, 255, 0.04)',
        'border-light': 'rgba(255, 255, 255, 0.08)',
        accent: {
          emerald: '#10B981',
          blue: '#3B82F6',
          teal: '#14B8A6',
          purple: '#8B5CF6'
        },
        text: {
          primary: 'rgba(255, 255, 255, 0.95)',
          secondary: 'rgba(255, 255, 255, 0.6)',
          muted: 'rgba(255, 255, 255, 0.4)'
        }
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'glow': '0 0 40px -10px rgba(20, 184, 166, 0.15)',
        'glow-purple': '0 0 40px -10px rgba(139, 92, 246, 0.15)',
        'float': '0 30px 60px -15px rgba(0,0,0,0.6), 0 10px 30px -5px rgba(0,0,0,0.4)',
        'glass': '0 4px 24px -2px rgba(0, 0, 0, 0.4)',
        'premium': '0 8px 32px -4px rgba(0, 0, 0, 0.5), 0 2px 8px -2px rgba(0,0,0,0.3)',
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out 4s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blob': 'blob 10s infinite alternate',
        'spin-slow': 'spin 12s linear infinite',
        'glow-line': 'glow-line 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(40px, -60px) scale(1.1)' },
          '66%': { transform: 'translate(-30px, 30px) scale(0.95)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        'glow-line': {
          '0%, 100%': { opacity: 0.1 },
          '50%': { opacity: 0.6 },
        }
      }
    }
  },
  plugins: []
}
