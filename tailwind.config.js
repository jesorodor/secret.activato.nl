/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                dark: {
                    900: '#0a0a0a',
                    800: '#111111',
                    700: '#1a1a1a',
                    600: '#222222',
                    500: '#2a2a2a',
                },
                light: {
                    900: '#ffffff',
                    800: '#f8fafc',
                    700: '#f1f5f9',
                    600: '#e2e8f0',
                    500: '#cbd5e1',
                },
                // Brand accent. The UI references the `teal` palette throughout
                // (buttons, links, focus rings), so we override it with the
                // Activato orange #e96025 — the primary accent for all buttons.
                accent: '#e96025',
                'accent-secondary': '#3a4f9d',
                teal: {
                    50: '#fdeee7',
                    100: '#fbd5c3',
                    200: '#f7b299',
                    300: '#f28e6e',
                    400: '#ee774a',
                    500: '#e96025',
                    600: '#cf501a',
                    700: '#a93f15',
                    800: '#832f10',
                    900: '#5f220b',
                },
                'brand-orange': {
                    50: '#fdeee7',
                    100: '#fbd5c3',
                    200: '#f7b299',
                    300: '#f28e6e',
                    400: '#ee774a',
                    500: '#e96025',
                    600: '#cf501a',
                    700: '#a93f15',
                },
            },
            screens: {
                xs: '475px',
            },
            animation: {
                pulse: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            backgroundImage: {
                'grid-pattern':
                    'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
                'grid-pattern-light':
                    'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 1px, transparent 0)',
            },
            backgroundSize: {
                grid: '20px 20px',
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
};
