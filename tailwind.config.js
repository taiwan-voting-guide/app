module.exports = {
  content: ['./utils/content.ts'],
  theme: {
    extend: {
      colors: {
        primary: '#3199BA',
        secondary: '#EC502B',
      },
    },
  },
  plugins: [
    require('@headlessui/tailwindcss'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
