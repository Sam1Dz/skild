export const navRoute = [
	{
		label: {
			desktop: 'Explore',
			mobile: 'Explore Skills',
		},
		href: '#explore',
		// TODO: gate behind auth once login flow is wired
		isLoginRequired: false,
	},
	{
		label: {
			desktop: 'Saved',
			mobile: 'Saved Skills',
		},
		href: '#saved',
		// TODO: gate behind auth once login flow is wired
		isLoginRequired: true,
	},
];
