/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class', // or 'class'
	theme: {
		extend: {
			fontFamily: {
				publicSans: ['Public Sans', 'sans-serif'],
			}
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
		function ({ addComponents, theme }) {
			addComponents({
				'.btn': {
					cursor: 'pointer',
					border: '0.25rem solid' + theme('colors.neutral.300'),
					width: 'fit-content',
					padding: '1rem 2rem',
					textTransform: 'uppercase',
					fontSize: theme('fontSize.xl'),
					fontWeight: theme('fontWeight.bold'),
					letterSpacing: theme('letterSpacing.wide'),
					display: 'inline-flex',
					gap: '0.5rem',
					alignItems: 'center'
				}
			})
		}
	],
}
