module.exports = {
  content: ['./utils/content.ts'],
  theme: {
    extend: {
      colors: {
        primary: '#3199BA',
      },
    },
  },
  plugins: [
    require('@headlessui/tailwindcss'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
