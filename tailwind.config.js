module.exports = {
  content: ['./server/api/*.ts', './nuxt.config.ts'],
  theme: {
    extend: {
      colors: {
        primary: '#3199BA',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
