/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {},
  },
  content: [
    './views/**/*.ejs',  // Pastikan path ini sesuai dengan direktori view Anda
    // './public/**/*.js',
    'node_modules/preline/dist/*.js',
  ],
  plugins: [
    // require('@tailwindcss/forms'),
    require('preline/plugin'),
  ],
}

