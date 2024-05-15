/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)"
      },
      boxShadow: {
        default: "0 3px 24px 2px rgb(0 0 0 / .1), 0 8px 3px -6px rgb(0 0 0 / .1)",
        btnAdd: "0 8px 16px rgba(47,26,83,.2), inset 0 -1px 2px rgba(36,19,64,.4), inset 0 1px 2px hsla(0,0%,100%,.4)",
        sidebarActive: "0 4px 4px -4px rgba(146,129,182,.15), inset 0 -1px 0 rgba(208,185,255,.15)"
      },
      backgroundImage: {
        btnAdd: "linear-gradient(180deg,#6b2bf2 5.73%,rgba(49,103,241,.69))",
        "gradient-primary": "linear-gradient(0deg,#721dff 25%,#8557d2 114.58%)",
        "btn-upgrade": "linear-gradient(180deg,#f3d689 -8.75%,#ffbc10 80%)",
        btnAddDes: "linear-gradient(0deg,#721dff 25%,#8557d2 114.58%)"
      },
      fontFamily: {
        // inter: ["Work Sans", "sans-serif"],
        // be: ["Be Vietnam Pro", "sans-serif"]
      },
      backgroundColor: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        common: "var(--background)"
      },
      borderColor: {
        primary: "var(--primary)",
        secondary: "var(--secondary)"
      },
      padding: {
        notch: "var(--touch)",
        back: "calc(var(--touch) + 34px)",
      },
      height: {
        notch: "var(--touch)"
      }
    }
  },
  plugins: []
};
