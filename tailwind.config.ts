import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        foreground: '#FFFFFF',
        accent: {
          DEFAULT: 'hsl(180, 100%, 40%)', // #00CCC2
          foreground: '#000000',
        },
        primary: {
          DEFAULT: '#ff7700', // Barberox Orange
          dim: 'rgba(255, 119, 0, 0.1)',
          glass: 'rgba(255, 119, 0, 0.05)',
        },
        black: {
          DEFAULT: '#050505',
          surface: '#0a0a0a',
          lighter: '#121212',
        },
      },
      fontFamily: {
        'space-grotesk': ['var(--font-space-grotesk)', 'sans-serif'],
        'inter': ['var(--font-inter)', 'sans-serif'],
        'outfit': ['var(--font-outfit)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.00) 100%)',
        'neon-glow': 'conic-gradient(from 180deg at 50% 50%, #ff7700 0deg, rgba(255,119,0,0) 180deg, #ff7700 360deg)',
      },
      boxShadow: {
        'neon': '0 0 20px rgba(255, 119, 0, 0.15), 0 0 40px rgba(255, 119, 0, 0.05)',
        'inner-light': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;