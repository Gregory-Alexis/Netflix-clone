module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        darknet: "#141414",
        button: "rgba(255,255,255, 0.1)",
      },
      display: ["group-hover"],

      transitionDuration: {
        400: "400ms",
      },
      height: {
        90: "90vh",
        80: "80vh",
        70: "70vh",
      },
      width: {
        20: "22vw",
        30: "30vw",
        40: "47vw",
        50: "50vw",
        60: "60vw",
        70: "70vw",
        80: "80vw",
        90: "90vw",
        100: "100vw",
      },

      transitionProperty: {
        position: "absolute",
      },

      fontSize: {
        "16xl": "20rem",
      },
    },
  },
  plugins: [],
};
