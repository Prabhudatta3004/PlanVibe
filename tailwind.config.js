/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'mint': '#98FF98',
                'coral': '#FF7F50',
                'lavender': '#E6E6FA',
            },
            fontFamily: {
                'sans': ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
} 