module.exports = {
  content: ['./utils/content.ts'],
  theme: {
    extend: {
      colors: {
        primary: '#3199BA',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
