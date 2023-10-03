/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                libre: ['"Playfair Display"', "serif"],
                roboto: ['"Roboto"', "sans-serif"],
                slab: ['"Roboto Slab"', "serif"],
                cinzel: ['"Cinzel"', "serif"],
                montserrat: ['"Montserrat"', "sans-serif"],
                playfair: ['"Playfair"', "serif"],
            },
        },
    },
    plugins: [],
};
