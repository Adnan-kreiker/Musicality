module.exports = {
  purge: {
    enabled: true,
    content: ["./public/**/*.html", "./src/**/*.vue"]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    screens: {
      sm: { min: "640px" },
      md: { min: "768px" },
      lg: { min: "1024px" },
      xl: { min: "1280px" },
      "2xl": { min: "1536px" }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
