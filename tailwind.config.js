module.exports = {
  content: ['./utils/content.ts'],
  theme: {
    extend: {
      colors: {
        primary: '#3199BA',
        secondary: '#EC502B',
      },
      keyframes: {
        'bg-blink': {
          '0%': {
            backgroundColor: 'rgba(49, 153, 186, 0)',
            borderRadius: '0.375rem',
          },
          '100%': {
            backgroundColor: 'rgba(49, 153, 186, 0.4)',
            borderRadius: '0.375rem',
          },
        },
      },
      animation: {
        'bg-blink': '0.5s 20 alternate bg-blink',
      },
    },
  },
  plugins: [
    require('@headlessui/tailwindcss'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
