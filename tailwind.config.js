module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        "9/10": "90%",
      },
      maxHeight: {
        0: "0",
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        full: "100%",
      },
      fontFamily: {
        body: [
          "Hiragino Kaku Gothic ProN",
          "ヒラギノ角ゴ ProN W3",
          "YuGothic",
          "Yu Gothic",
          "sans-serif",
        ],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  important: true,
};
