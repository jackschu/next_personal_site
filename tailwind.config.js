/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        //        darkMode: 'class',
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                primary: 'var(--color-text-primary)',
                background: 'var(--color-background)',
                'primary-button': 'var(--color-primary-button)',
                'secondary-button': 'var(--color-secondary-button)',
                accent: 'var(--color-accent)',
            },

            keyframes: {
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-12deg)' },
                    '50%': { transform: 'rotate(12deg)' },
                },
            },
            animation: {
                wiggle: 'wiggle 0.8s ease-in-out infinite',
            },
        },
    },
    plugins: [],
}
