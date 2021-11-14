module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "vivid-red": "red",
      },
      spacing: {
        "0.5%": "5%",
        "1/10": "10%",
        "2/10": "20%",
        "3/10": "30%",
        "4/10": "40%",
        "5/10": "50%",
        "6/10": "60%",
        "7/10": "70%",
        "8/10": "80%",
        "9/10": "90%",

        "1v": "1vh",
        "2v": "2vh",
        "4v": "4vh",
        "6v": "6vh",
        "8v": "8vh",
        "10v": "10vh",
        "20v": "20vh",
        "30v": "30vh",
        "40v": "40vh",
        "50v": "50vh",
        "60v": "60vh",
        "70v": "70vh",
        "80v": "80vh",
        "90v": "90vh",
        "100v": "100vh",
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
  plugins: [
    require("tailwindcss-writing-mode")({
      variants: ["responsive", "hover"],
    }),
  ],
  important: true,
};
