import { Button, Chip } from '@heroui/react';
import { Icon } from '@iconify-icon/react';

function AppHeader() {
	return (
		<header className="sticky top-0 z-40 w-full border-border border-b bg-(--background)/85 backdrop-blur-md transition-colors duration-200">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				<div className="flex items-center gap-6 md:gap-8">
					<a
						href="#home"
						className="group flex items-center gap-2.5 rounded focus:outline-none focus:ring-2 focus:ring-focus"
					>
						<div className="sm-radius flex h-7 w-7 items-center justify-center">
							<img src="/logo/skild-logo.svg" alt="" className="h-full w-full object-contain" />
						</div>
						<span className="typography--h4">Skilled</span>
					</a>

					<nav className="typography--body-sm hidden items-center gap-6 font-medium md:flex">
						<a href="#explore" className="transition-colors hover:text-accent">
							Explore
						</a>
						<a
							href="#saved"
							className="flex items-center gap-1.5 transition-colors hover:text-accent"
						>
							<span>Saved</span>
							<Chip className="font-mono" color="accent">
								3
							</Chip>
						</a>
					</nav>
				</div>

				<div className="flex items-center gap-3">
					<Button variant="outline" size="sm" className="hidden md:inline-flex">
						Login
					</Button>
					<Button variant="ghost" size="sm" isIconOnly>
						<Icon icon="lucide:sun-moon" width={21} height={21} />
					</Button>
					<Button variant="ghost" size="sm" isIconOnly>
						<Icon icon="gravity-ui:bars" width={21} height={21} className="inline-flex md:hidden" />
					</Button>
				</div>
			</div>
		</header>
	);
}

export default AppHeader;
