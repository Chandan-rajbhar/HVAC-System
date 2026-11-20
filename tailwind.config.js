/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        polar: {
          DEFAULT: '#F1F3F4',
          50: '#FFFFFF',
          100: '#F8F9FA',
          200: '#F1F3F4',
          300: '#E8EAED',
          400: '#DADCE0',
          500: '#BDC1C6',
        },
        deepViolet: {
          DEFAULT: '#241A6E',
          50: '#F3F1FB',
          100: '#E5E1F6',
          200: '#C7BEEB',
          300: '#A496DE',
          400: '#6955BE',
          500: '#4632A4',
          600: '#322387',
          700: '#241A6E',
          800: '#1A1252',
          900: '#110B38',
          950: '#090520',
        },
        status: {
          operational: '#10B981',
          attention: '#EF4444',
          warning: '#F59E0B',
          neutral: '#94A3B8',
        },
        faceplate: {
          white: '#F8FAFC',
          tan: '#C8B69E',
          red: '#C83228',
          blue: '#1E40AF',
        }
      },
      boxShadow: {
        'neumorph-flat': '6px 6px 14px rgba(166, 175, 195, 0.4), -6px -6px 14px rgba(255, 255, 255, 0.9)',
        'neumorph-pressed': 'inset 4px 4px 8px rgba(166, 175, 195, 0.4), inset -4px -4px 8px rgba(255, 255, 255, 0.9)',
        'neumorph-sm': '3px 3px 8px rgba(166, 175, 195, 0.35), -3px -3px 8px rgba(255, 255, 255, 0.85)',
        'neumorph-convex': '4px 4px 10px rgba(166, 175, 195, 0.35), -4px -4px 10px rgba(255, 255, 255, 0.95)',
        'glass': '0 8px 32px 0 rgba(36, 26, 110, 0.08)',
        'glow-violet': '0 0 20px rgba(36, 26, 110, 0.35)',
        'glow-green': '0 0 15px rgba(16, 185, 129, 0.45)',
        'glow-red': '0 0 15px rgba(239, 68, 68, 0.45)',
        'phone-frame': '0 25px 60px -12px rgba(0, 0, 0, 0.35), 0 12px 24px -8px rgba(0, 0, 0, 0.25)',
      },
      borderRadius: {
        'phone': '48px',
        'phone-inner': '40px',
      },
      keyframes: {
        pulseSlow: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.6, transform: 'scale(0.97)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        fanSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        floatSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        }
      },
      animation: {
        'pulse-slow': 'pulseSlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spinSlow 12s linear infinite',
        'fan-active': 'fanSpin 1.2s linear infinite',
        'fan-boost': 'fanSpin 0.5s linear infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'float': 'floatSubtle 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
