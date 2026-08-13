import { useAppTheme } from '@/integrations/app-theme/provider';
import type { Theme } from '@/integrations/app-theme/server';

const OPTIONS: Array<{ value: Theme; label: string }> = [
	{ value: 'light', label: 'Light' },
	{ value: 'dark', label: 'Dark' },
	{ value: 'system', label: 'System' },
];

export default function ThemeToggle() {
	const { theme, setTheme } = useAppTheme();

	return (
		<div className="inline-flex border border-neutral-300 dark:border-neutral-700">
			{OPTIONS.map(({ value, label }) => (
				<button
					key={value}
					type="button"
					onClick={() => setTheme(value)}
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
