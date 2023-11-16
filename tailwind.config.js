/** @type {import('tailwindcss').Config} */
export default {
    theme: {
        screens: {

            xs: '375px',
            // => @media (min-width: 375px) { ... }

            sm: '575px',
            // => @media (min-width: 575px) { ... }

            md: '768px',
            // => @media (min-width: 768px) { ... }

            lg: '991',
            // => @media (min-width: 991px) { ... }

            xl: '1200',
            // => @media (min-width: 1200px) { ... }

            '2xl': '1400',
            // => @media (min-width: 1400px) { ... }
        },

        extend: {
            colors: {
                royalBlue: {
                    DEFAULT: '#4F46E5',
                    50: '#E8E7FC',
                    100: '#D7D5F9',
                    200: '#B5B1F4',
                    300: '#938EEF',
                    400: '#716AEA',
                    500: '#4F46E5',
                    600: '#281ED5',
                    700: '#1F17A4',
                    800: '#161073',
                    900: '#0C0941',
                    950: '#080629'
                },
            }
        }
    }
}