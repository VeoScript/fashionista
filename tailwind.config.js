const plugin = require("tailwindcss/plugin");

module.exports = {
  theme: {
    extend: {
      colors: {
        "default-green": "#65d084",
        "default-blue": "#1c4965",
      },
      fontFamily: {
        lemon: ["Lemon-Regular"],
        poppins: ["Poppins-Regular"],
        "poppins-light": ["Poppins-Light"],
        "poppins-bold": ["Poppins-Bold"],
        "poppins-black": ["Poppins-Black"],
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".primary-button": `flex-row items-center justify-center p-5 rounded-xl bg-default-green`,
        ".secondary-button": `flex-row items-center justify-center p-5 rounded-xl bg-default-blue`,
        ".default-button": `flex-row items-center justify-center p-5 rounded-xl`,
      });
    }),
  ],
};
