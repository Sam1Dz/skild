import { Link, Separator } from '@heroui/react';

export default function AppFooter() {
	return (
		<footer className="relative mt-auto overflow-hidden border-border border-t bg-background/85 backdrop-blur-md">
			<div className="pointer-events-none absolute inset-0 z-0 bg-diagonal-pattern" />

			<div className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
				<div className="typography--body-xs flex flex-col items-center justify-between gap-4 text-muted sm:flex-row">
					<div className="group flex items-center gap-2.5 rounded">
						<div className="flex h-6 w-6 items-center justify-center rounded-sm">
							<img src="/logo/skild-logo.svg" alt="" className="h-full w-full object-contain" />
						</div>
						<span className="typography--h6">Skilled</span>
						<Separator orientation="vertical" />
						<p>
							This project is{' '}
							<Link
								href="https://github.com/Sam1Dz/skild"
								target="_blank"
								rel="noopener noreferrer"
							>
								open source
							</Link>
						</p>
					</div>

					<div className="flex items-center gap-2">
						<p>
							Created by{' '}
							<Link
								href="https://github.com/adrianhajdin"
								rel="noopener noreferrer"
								target="_blank"
							>
								adrianhajdin
							</Link>
							, Recreated by{' '}
							<Link href="https://github.com/Sam1Dz" rel="noopener noreferrer" target="_blank">
								Sam1Dz
							</Link>
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
