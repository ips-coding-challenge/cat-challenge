module.exports = {
  purge: [],
  theme: {
    extend: {
      colors: {
        text: "#291507;",
        secondary: "#E3E1DC",
      },
      fontFamily: {
        rale: ["Raleway", "sans-serif"],
        logo: ["Mystery Quest", "sans-serif"],
      },
      maxHeight: {
        "-200": "200px",
      },
      height: {
        "hero-sm": "160px",
        "hero-md": "320px",
        "hero-lg": "540px",
      },
      borderRadius: {
        // "t-base": [
        //   "border-top-left-radius: 24px;",
        //   "border-top-right-radius: 24px;",
        // ],
        "t-base": {
          "border-top-left-radius": "24px",
          "border-top-right-radius": "24px",
        },
        base: "24px",
        double: "48px",
        extra: "59px",
      },
    },
  },
  variants: {},
  plugins: [],
};
