/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './index.html',
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1280px',
            },
        },
        extend: {
            colors: {
                // Updated palette to match your dashboard image
                background: '#020617', // Deep Dark Blue (Slate 950)
                foreground: '#f8fafc', // Off-white text
                primary: {
                    DEFAULT: '#2563eb', // Vivid Blue for buttons/icons
                    foreground: '#ffffff',
                },
                secondary: {
                    DEFAULT: '#1e293b', // Slate 800 for secondary elements
                    foreground: '#f1f5f9',
                },
                accent: {
                    DEFAULT: '#3b82f6', // Lighter blue for highlights
                    foreground: '#ffffff',
                },
                muted: {
                    DEFAULT: '#0f172a', // Slate 900 for muted backgrounds
                    foreground: '#94a3b8', // Slate 400 for secondary text
                },
                card: {
                    DEFAULT: '#0f172a', // Matching your Sidebar/Card color
                    foreground: '#f1f5f9',
                },
                border: '#1e293b', // Dark slate border
                glass: 'rgba(15, 23, 42, 0.6)', // Darker glass effect

                // Status colors seen in your dashboard
                success: '#10b981', // Green for "Available"
                danger: '#ef4444', // Red for "Delete" buttons
            },
            fontFamily: {
                sans: [
                    'Inter',
                    'ui-sans-serif',
                    'system-ui',
                    'Segoe UI',
                    'Roboto',
                    'Helvetica Neue',
                    'Arial',
                    'sans-serif',
                ],
                heading: [
                    'Inter',
                    'ui-sans-serif',
                    'system-ui',
                    'Segoe UI',
                    'Roboto',
                    'Helvetica Neue',
                    'Arial',
                    'sans-serif',
                ],
            },
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1.5' }],
                sm: ['0.875rem', { lineHeight: '1.5' }],
                base: ['1rem', { lineHeight: '1.7' }],
                lg: ['1.125rem', { lineHeight: '1.7' }],
                xl: ['1.25rem', { lineHeight: '1.7' }],
                '2xl': ['1.5rem', { lineHeight: '1.3' }],
                '3xl': ['1.875rem', { lineHeight: '1.2' }],
                '4xl': ['2.25rem', { lineHeight: '1.1' }],
                '5xl': ['3rem', { lineHeight: '1' }],
            },
            borderRadius: {
                sm: '0.5rem',
                md: '1rem',
                lg: '1.5rem',
                xl: '2rem',
                full: '9999px',
            },
            boxShadow: {
                glass: '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
                card: '0 4px 12px 0 rgba(0, 0, 0, 0.3)',
                input: '0 1px 2px 0 rgba(0, 0, 0, 0.2)',
            },
            backdropBlur: {
                xs: '2px',
            },
            spacing: {
                18: '4.5rem',
                22: '5.5rem',
                30: '7.5rem',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('tw-animate-css'),
    ],
}