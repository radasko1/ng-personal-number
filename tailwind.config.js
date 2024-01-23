/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,ts}'],
    theme: {
        fontFamily: {
          'open-sans': ['"Open Sans"', 'sans-serif'],
          'rubik': ['"Rubik"', 'sans-serif'],
          'roboto': ['"Roboto"', 'sans-serif'],
        },
        extend: {
          colors: {
            'violet': '#8700D7',
            'yellow': '#E9D502',
          }
        },
    },
    plugins: [],
}
