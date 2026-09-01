import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

export default {
	theme: {
		extend: {
			fontFamily: {
				bebas: ['Bebas Neue'],
				inter: ['Inter']
			},
			colors: {
				dark: 'hsl(0, 0%, 7%)',
				dark_light: 'hsl(0,0%,11%)',
				primary: 'hsl(360, 74%, 51%)',
				secondary: 'hsl(157, 100%, 22%)'
			}
		},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: colors.black,
			white: colors.white,
			gray: colors.neutral,
			indigo: colors.indigo,
			yellow: colors.amber,
			blue: colors.sky,
			green: colors.emerald,
			red: colors.red
		}
	},
	plugins: [require('@tailwindcss/forms')]
} satisfies Config;
