/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        snappieYellow1: "#FAE446",
        snappieYellow2: "#FFE97F",
        snappieBlack: "#1E1E24",
        snappieWhite: "#FFFFFF",
        snappieGray: "#2D2D3A",
        snappieBlue: "#3298E0",
        snappieGreen: "#BBDA97",
        snappiePink: "#F9ADB0",
        snappieGray2: "#FBFDFC",
        badgeGreen: "#D1F7C4", 
        badgeGreenText: "#277A43", 
        badgeRed: "#FAD4D4", 
        badgeRedText: "#8C1C1C",

        // Cute Pastel Glass Palette
        cute: {
          pink: "#FFB5CF",
          pinkLight: "#FFE4EE",
          pinkDark: "#E86A92",
          lavender: "#D6C7FF",
          lavenderLight: "#F0EBFF",
          lavenderDark: "#8B65DB",
          blue: "#A8DADC",
          sky: "#BAE6FD",
          skyLight: "#E0F2FE",
          mint: "#B7EFC5",
          mintLight: "#E8F8F0",
          peach: "#FFD6BA",
          peachLight: "#FFF0E5",
          yellow: "#FFEAA7",
          cream: "#FFF9F2",
          cardBg: "rgba(255, 255, 255, 0.45)",
          glassBorder: "rgba(255, 255, 255, 0.65)",
        }
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
        cute: ["'Fredoka'", "cursive", "sans-serif"],
        pixel: ["'Press Start 2P'", "cursive"],
        press: ["'Press Start 2P'", "cursive"],
        roboto: ["Roboto", "sans-serif"],
      },
      boxShadow: {
        pixel: "0 4px 0 #000",
        deep: "0 10px 25px rgba(0,0,0,0.18)",
        glass: "0 8px 32px 0 rgba(175, 140, 220, 0.18)",
        glassCard: "0 20px 45px -10px rgba(255, 140, 180, 0.25), 0 10px 20px -5px rgba(160, 190, 240, 0.2)",
        glassButton: "0 8px 24px -4px rgba(255, 120, 160, 0.4)",
        glassSoft: "0 4px 20px 0 rgba(0, 0, 0, 0.05)",
        cuteGlow: "0 0 25px rgba(255, 181, 207, 0.6)",
      },
      dropShadow: {
        icon: "0 18px 32px rgba(0,0,0,0.45)",
        cute: "0 4px 12px rgba(255, 105, 180, 0.3)",
      },
      backdropBlur: {
        xs: "2px",
        sm: "6px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "40px",
      },
      borderRadius: {
        xl2: "32px",
        cute: "28px",
        "4xl": "36px",
      },
      animation: {
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 5s ease-in-out infinite',
        'pulse-gentle': 'pulseGentle 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'sparkle': 'sparkle 1.8s ease-in-out infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(10px) rotate(-2deg)' },
        },
        pulseGentle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        }
      }
    },
  },
  plugins: [],
}
