import { Button, Chip } from '@heroui/react';
import { Icon } from '@iconify-icon/react';
import { Link } from '@tanstack/react-router';
import { navRoute } from '@/config/route';
import { useTheme } from '@/integrations/app-theme/provider';
import type { Theme } from '@/integrations/app-theme/server';
import MobileDrawer from './mobile-drawer';

const themeCycle: Record<Theme, Theme> = {
	light: 'dark',
	dark: 'system',
	system: 'light',
};
const themeIcon: Record<Theme, string> = {
	light: 'gravity-ui:sun',
	dark: 'gravity-ui:moon',
	system: 'lucide:sun-moon',
};

export default function AppHeader() {
	const { theme, setTheme } = useTheme();

	return (
		<header className="sticky top-0 z-50 w-full border-border border-b bg-background/15 backdrop-blur-md transition-colors duration-200">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				<div className="flex items-center gap-6 md:gap-8">
					<Link to="/" className="group flex items-center gap-2.5 rounded">
						<div className="flex h-7 w-7 items-center justify-center rounded-sm">
							<img src="/logo/skild-logo.svg" alt="" className="h-full w-full object-contain" />
						</div>
						<span className="typography--h4">Skilled</span>
					</Link>

					<nav
						aria-label="Main navigation"
						className="typography--body-sm hidden items-center gap-6 font-medium md:flex"
					>
						{navRoute.map(item => (
							<a
								key={item.href}
								href={item.href}
								className="flex items-center gap-1.5 transition-colors hover:text-accent"
							>
								<span>{item.label.desktop}</span>
								{item.href === '#saved' && (
									// TODO: replace with live saved-skills count once auth/data is wired
									<Chip className="font-mono" color="accent">
										3
									</Chip>
								)}
							</a>
						))}
					</nav>
				</div>

				<div className="flex items-center gap-3">
					<Button variant="outline" size="sm" className="hidden md:inline-flex">
						Sign In
					</Button>

					<Button
						variant="ghost"
						size="sm"
						isIconOnly
						onPress={() => setTheme(themeCycle[theme])}
						aria-label={`Switch theme (current: ${theme})`}
					>
						<Icon icon={themeIcon[theme]} width={16} height={16} />
					</Button>

					<MobileDrawer />
				</div>
			</div>
		</header>
	);
}
