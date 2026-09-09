import { createFileRoute } from '@tanstack/react-router';

import FeaturedSkills from '@/components/pages/home/featured';
import Hero from '@/components/pages/home/hero';

export const Route = createFileRoute('/')({ component: Home });

function Home() {
	return (
		<>
			<Hero />
			<FeaturedSkills />
		</>
	);
}
