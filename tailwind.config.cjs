/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                'sl-color-accent': 'var(--sl-color-accent)',
                'sl-color-black': 'var(--sl-color-black)',
                'sl-color-gray-7': 'var(--sl-color-gray-7)',
            },
        },
    },
    plugins: [],
}