/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.{html,js}"], // Scan your HTML and JS files for Tailwind classes
    theme: {
      extend: {
        colors: {
          primary: "#FF1F3D", // Custom primary color
        },
      },
    },
    plugins: [require("daisyui")], // Enable DaisyUI for additional UI components
  };
  