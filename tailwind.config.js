const sizes = {
  height: {
    "half-screen": "50vh",
    "one-third-screen": "33vh",
  },
  width: {
    none: "0px",
    "half-screen": "50vw",
    "one-third-screen": "33vw",
  },
};

module.exports = {
  purge: [
    "./src/**/*.jsx",
    "./src/**/*.ts",
    "./src/**/*.tsx",
    "./src/**/*.html",
    "./src/**/*.js",
  ],
  theme: {
    extend: {
      height: {
        300: "300px",
        350: "350px",
      },
      minWidth: sizes.width,
      maxWidth: sizes.width,
      minHeight: sizes.height,
      maxHeight: sizes.height,
      fontFamily: {
        sans: ["montserrat", "helvetica", "arial"],
        headline: ["montserrat", "helvetica", "arial"],
        mono: ["source code pro"],
      },
      colors: {
        techTags: "#DAA520",
        pageBG: "#e9e2ad",
        navColor: "#e8de8c"
      },
    },
  },
  variants: {
    boxShadow: ["responsive", "hover", "focus"],
  },
  plugins: [
    function ({ addBase, config }) {
      addBase({
        // Add base styles when needed
      });
    },
  ],
};
