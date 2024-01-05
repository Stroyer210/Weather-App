/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "my-image": "url(/sky.jpeg)"
      }
    },
  },
  plugins: [],
}

