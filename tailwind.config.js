const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial-button': 'linear-gradient(90deg, #FD267D 0%, #FF7854 100%)',
        'gradient-radial-basic': 'radial-gradient(51.22% 338.65% at 13.54% 67.5%, #EA5B6C 0%, #ed805d 100%)',
        'gradient-radial': 'url(/images/ellipse-mask.png),radial-gradient(51.22% 338.65% at 13.54% 67.5%, #EA5B6C 0%, #ED805D 100%)',
        'gradient-radial-mobile': 'url(/images/ellipse-mask-mobile.png),radial-gradient(51.22% 338.65% at 13.54% 67.5%, #eb6668 0%, #ED805D 100%)',
      },
      colors: {
        primary: '#4890E3',
        green: '#83CB3D'
      },
      aspectRatio: {
        banner: '3/1',
        bannerMobile: '9/5',
      },
      fontSize: {
        xl: '1.22rem',
      },
      fontFamily: {
        raleway: ['var(--font-raleway)', ...fontFamily.sans],
        support: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Raleway', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        slider: '0 0 0 5px rgba(0, 0, 0, 0.3)',
        DEFAULT: '0 0 1px 0 rgb(0, 0, 0, 0.3), 0 4px 6px -2px rgb(0, 0, 0, 0.25)',
      },
      keyframes: {
        // Dropdown menu
        'scale-in': {
          '0%': { opacity: 0, transform: 'scale(0)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        'slide-down': {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        // Accordion
        'accordion-collapse': {
          '0%': { height: 'var(--radix-accordion-content-height)' },
          '100%': { height: 0 },
        },
        'accordion-expand': {
          '0%': { height: 0 },
          '100%': { height: 'var(--radix-accordion-content-height)' },
        },
        // Tooltip
        'slide-up-fade': {
          '0%': { opacity: 0, transform: 'translateY(2px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'slide-right-fade': {
          '0%': { opacity: 0, transform: 'translateX(-2px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        'slide-down-fade': {
          '0%': { opacity: 0, transform: 'translateY(-2px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'slide-left-fade': {
          '0%': { opacity: 0, transform: 'translateX(2px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        'slide-up-effect': {
          '0%': {
            marginTop: '100vh',
            opacity: 0,
          },
          '20%': {
            marginTop: '30vh',
            opacity: 0,
          },
          '100%': {
            marginTop: '0',
            opacity: 1,
          },
        },
        // Navigation menu
        'enter-from-right': {
          '0%': { transform: 'translateX(200px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        'enter-from-left': {
          '0%': { transform: 'translateX(-200px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        'exit-to-right': {
          '0%': { transform: 'translateX(0)', opacity: 1 },
          '100%': { transform: 'translateX(200px)', opacity: 0 },
        },
        'exit-to-left': {
          '0%': { transform: 'translateX(0)', opacity: 1 },
          '100%': { transform: 'translateX(-200px)', opacity: 0 },
        },
        'scale-in-content': {
          '0%': { transform: 'rotateX(-30deg) scale(0.9)', opacity: 0 },
          '100%': { transform: 'rotateX(0deg) scale(1)', opacity: 1 },
        },
        'scale-out-content': {
          '0%': { transform: 'rotateX(0deg) scale(1)', opacity: 1 },
          '100%': { transform: 'rotateX(-10deg) scale(0.95)', opacity: 0 },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'fade-out': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        // Toast
        'toast-hide': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        'toast-slide-in-right': {
          '0%': { transform: `translateX(calc(100% + 1rem))` },
          '100%': { transform: 'translateX(0)' },
        },
        'toast-slide-in-bottom': {
          '0%': { transform: `translateY(calc(100% + 1rem))` },
          '100%': { transform: 'translateY(0)' },
        },
        'toast-swipe-out-x': {
          '0%': { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
          '100%': {
            transform: `translateX(calc(100% + 1rem))`,
          },
        },
        'toast-swipe-out-y': {
          '0%': { transform: 'translateY(var(--radix-toast-swipe-end-y))' },
          '100%': {
            transform: `translateY(calc(100% + 1rem))`,
          },
        },
        'flash-animate': {
          '0%': {
            left: '-30%'
          },
          '50%': {
            left: '130%'
          },
          '100%': {
            left: '130%'
          }
        },
        // Progress bar
        progress: {
          '0%': {
            width: '0%',
          },
          '100%': {
            width: 'var(--percentage)',
          },
        },
        // Dialogs
        'scale-in-dialog': {
          '0%': { opacity: 0, transform: 'translate(-50%, -50%) scale(0)' },
          '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        },
        'content-show-dialog': {
          '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
          '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        },
      },
      animation: {
        // Dropdown menu
        'scale-in': 'scale-in 0.2s ease-in-out',
        'slide-down': 'slide-down 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        // Accordion
        'accordion-collapse': 'accordion-collapse 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'accordion-expand': 'accordion-expand 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        // Tooltip
        'slide-up-effect': 'slide-up-effect 1500ms ease-in-out',
        'slide-up-fade': 'slide-up-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-right-fade': 'slide-right-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down-fade': 'slide-down-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-left-fade': 'slide-left-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        // Navigation menu
        'enter-from-right': 'enter-from-right 0.25s ease',
        'enter-from-left': 'enter-from-left 0.25s ease',
        'exit-to-right': 'exit-to-right 0.25s ease',
        'exit-to-left': 'exit-to-left 0.25s ease',
        'scale-in-content': 'scale-in-content 0.2s ease',
        'scale-out-content': 'scale-out-content 0.2s ease',
        'fade-in': 'fade-in 0.2s ease',
        'fade-out': 'fade-out 0.2s ease',
        // Toast
        'toast-hide': 'toast-hide 100ms ease-in forwards',
        'toast-slide-in-right': 'toast-slide-in-right 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        'toast-slide-in-bottom': 'toast-slide-in-bottom 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        'toast-swipe-out-x': 'toast-swipe-out-x 100ms ease-out forwards',
        'toast-swipe-out-y': 'toast-swipe-out-y 100ms ease-out forwards',
        'progress-load': 'progress 1s linear',
        // Dialogs
        'scale-in-dialog': 'scale-in-dialog 0.3s ease-in-out',
        'content-show-dialog': 'content-show-dialog 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
        // Static promo pages
        'slide-up-slow': 'toast-slide-in-bottom 1500ms cubic-bezier(0.4, 0, 0.2, 1)',
        'flash': 'flash-animate 3000ms ease-in-out infinite',
      },
      zIndex: {
        60: '60',
      },
    },
    typography: {
      // this is for prose class
      DEFAULT: {
        css: {
          ol: {
            'list-style-type': 'decimal',
          },
          ul: {
            'list-style-type': 'disc',
            'list-style-position': 'inside',
          },
          h1: {
            'font-size': '2em',
            'font-weight': 'bold',
          },
          h2: {
            'font-size': '1.5em',
            'font-weight': 'bold',
          },
          h3: {
            'font-size': '1.17em',
            'font-weight': 'bold',
          },
          a: {
            color: '#0000EE',
            'text-decoration': 'underline',
            '&:hover': {
              'font-weight': 'normal',
            },
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-radix')(),
    // ...
  ],
};
