/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1000px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        'gronik': {
          'primary': '#2D1B3D',    // Dark purple background
          'secondary': '#3D2A54',  // Medium purple
          'accent': '#9B7BB8',     // Light purple/lavender
          'light': '#FFFFFF',      // White text
          'text': '#3A2D42',       // Dark text
          'bg': '#1F1B24',         // Very dark background
          'shadow': '#2A1F35',     // Shadow color
        }
      },
      animation: {
        'gradient-x': 'gradient-x 3s ease infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'fade-in-up': {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        }
      }
    },
  },
  plugins: [],
}