import { Button, buttonVariants } from '@heroui/react';
import { Icon } from '@iconify-icon/react';

export default function Hero() {
	return (
		<section className="relative mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-20 md:px-8 md:py-24">
			<h1 className="typography--h1 font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
				The Registry for <br className="hidden sm:inline" />
				<span className="text-accent">Agentic Intelligence</span>
			</h1>

			<p className="typography--body mx-auto mt-6 max-w-2xl text-muted leading-relaxed sm:text-lg">
				A high-performance registry for procedural agent skills. Discover, publish, and operate
				reusable agent capabilities from a route-driven workspace.
			</p>

			<div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
				<a href="#featured-grid" className={buttonVariants({ className: 'w-full sm:w-auto' })}>
					<Icon icon="gravity-ui:terminal-line" width={18} height={18} />
					<span>Browse Registry</span>
				</a>

				{/* TODO: wire to skill-publish workflow once auth is in place */}
				<Button variant="outline" className="w-full sm:w-auto">
					<Icon icon="gravity-ui:plus" width={18} height={18} />
					<span>Publish Skill</span>
				</Button>
			</div>
		</section>
	);
}
