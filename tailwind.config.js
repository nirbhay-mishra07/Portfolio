/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        g: { 400: '#00ff41', 500: '#00cc33', 600: '#009922', 900: '#001a00' }
      },
      fontFamily: {
        mono: ['"Share Tech Mono"', 'monospace'],
        orb: ['Orbitron', 'monospace'],
      },
      keyframes: {
        blink: { '50%': { opacity: '0' } },
        scanline: { 'from': { top: '-40%' }, 'to': { top: '140%' } },
        fadeup: { 'from': { opacity: '0', transform: 'translateY(20px)' }, 'to': { opacity: '1', transform: 'translateY(0)' } },
        pglow: { '0%,100%': { boxShadow: '0 0 0 0 rgba(0,255,65,0.6)' }, '50%': { boxShadow: '0 0 0 6px rgba(0,255,65,0)' } },
        gridmove: { 'from': { transform: 'translate(0,0)' }, 'to': { transform: 'translate(40px,40px)' } },
        flicker: { '0%,100%': { opacity: '0.5' }, '50%': { opacity: '1' } },
        barfill: { 'from': { width: '0%' }, 'to': { width: 'var(--tw-bar-width)' } },
      },
      animation: {
        blink: 'blink 0.9s step-end infinite',
        scanline: 'scanline 6s linear infinite',
        fadeup: 'fadeup 0.6s ease both',
        pglow: 'pglow 1.5s ease-in-out infinite',
        gridmove: 'gridmove 20s linear infinite',
        flicker: 'flicker 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
