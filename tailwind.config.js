/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 1. Tipografía Oficial (Ya reemplazamos Montserrat permanentemente)
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      
      // 2. Paleta Institucional, Textos y Bordes
      colors: {
        institucional: {
          primario: 'darkcyan',
          secundario: '#f68628',
          fondo: '#f4f7f6',
          superficie: '#ffffff',
        },
        texto: {
          oscuro: '#0f172a',
          principal: '#1e293b',
          regular: '#2c3e50',
          secundario: '#475569',
          claro: '#64748b',
        },
        borde: {
          fuerte: '#e2e8f0',
          suave: '#f1f5f9',
        }
      },

      // 3. Estructura UI (Radios y Sombras)
      borderRadius: {
        institucional: '8px',
      },
      boxShadow: {
        tarjeta: '0 4px 15px rgba(0, 0, 0, 0.05)',
        flotante: '0 4px 6px rgba(0, 0, 0, 0.15)',
      },
      
      // 4. Transiciones
      transitionDuration: {
        base: '400ms', // Equivale a tu 0.4s
      },
      transitionTimingFunction: {
        base: 'ease',
      }
    },
  },
  plugins: [],
}