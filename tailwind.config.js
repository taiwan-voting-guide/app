module.exports = {
  content: ['./server/api/*.ts'],
  theme: {
    extend: {
      colors: {
        primary: '#3199BA',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
