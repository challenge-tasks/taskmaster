/** @type {import('tailwindcss').Config} */
export default {
    theme: {
        screens: {
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
    }
}