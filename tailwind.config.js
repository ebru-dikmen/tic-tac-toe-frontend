module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        yellow: '#F6E05E'
      },
    }
  },
  variants: {},
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
