/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '././**/*.html',
    '././**/*.js',
],
  theme: {
    spacing: {
      some_key: {
        1.5: '1.5rem',
      },
    },
    colors: {
      'primary': '#9333ea',
    },
    extend: {},
  },
  plugins: [],
};

