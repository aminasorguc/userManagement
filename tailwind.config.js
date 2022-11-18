module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html", "./node_modules/flowbite/**/*.js"],
    theme: {
      extend: {},
      colors: {
        sky: {
          200: '#bae6fd',
        }
      }
    },
    plugins: [
      require('flowbite/plugin')
    ],
  }