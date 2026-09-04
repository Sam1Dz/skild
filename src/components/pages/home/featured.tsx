import { Button } from '@heroui/react';
import { Icon } from '@iconify-icon/react';
import { featuredSkills } from '@/data/dummy';
import SkillCard from './card';

export default function FeaturedSkills() {
	return (
		<section
			id="featured-grid"
			className="mx-auto w-full max-w-7xl flex-1 scroll-mt-20 px-4 py-12 sm:px-6 lg:px-8"
		>
			<div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
				<div>
					<h2 className="typography--h3 font-bold tracking-tight sm:text-3xl">
						<span className="text-foreground">Featured </span>
						<span className="text-accent">Skills</span>
					</h2>
					<p className="typography--body-sm mt-1 text-muted">
						Top rated capabilities across research, code, security, and operations.
					</p>
				</div>

				{/* TODO: link to the full registry route once it exists */}
				<Button variant="outline" className="self-start md:self-auto">
					<span>Explore All</span>
					<Icon icon="gravity-ui:arrow-right" width={18} height={18} />
				</Button>
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{featuredSkills.map(skill => (
					<SkillCard key={skill.slug} skill={skill} />
				))}
			</div>
		</section>
	);
}
