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
                // brand color #516969 to re-skin the whole app in one place.
                accent: '#516969',
                teal: {
                    50: '#eef0f0',
                    100: '#dce1e1',
                    200: '#bdc6c6',
                    300: '#9facac',
                    400: '#778a8a',
                    500: '#516969',
                    600: '#425656',
                    700: '#354444',
                    800: '#283434',
                    900: '#1c2525',
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
