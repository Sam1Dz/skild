import { useRouteContext } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import * as React from 'react';
import { setThemeFn, type Theme } from '@/lib/theme';

function resolveTheme(theme: Theme): 'light' | 'dark' {
	if (theme !== 'system') return theme;
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
	const resolved = resolveTheme(theme);
	const root = document.documentElement;
	root.classList.remove('light', 'dark');
	root.classList.add(resolved);
	root.dataset.theme = resolved;
	root.style.colorScheme = resolved;
}

const OPTIONS: Array<{ value: Theme; label: string }> = [
	{ value: 'light', label: 'Light' },
	{ value: 'dark', label: 'Dark' },
	{ value: 'system', label: 'System' },
];

export default function ThemeToggle() {
	const { theme: initialTheme } = useRouteContext({ from: '__root__' });
	const [theme, setTheme] = React.useState(initialTheme);
	const setThemeServer = useServerFn(setThemeFn);

	function handleSelect(next: Theme) {
		setTheme(next);
		applyTheme(next);
		void setThemeServer({ data: next });
	}

	return (
		<div className="inline-flex border border-neutral-300 dark:border-neutral-700">
			{OPTIONS.map(({ value, label }) => (
				<button
					key={value}
					type="button"
					onClick={() => handleSelect(value)}
					aria-pressed={theme === value}
					className={`px-3 py-1.5 font-medium text-sm transition-colors ${
						theme === value
							? 'bg-neutral-900 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900'
							: 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800'
					}`}
				>
					{label}
				</button>
			))}
		</div>
	);
}
