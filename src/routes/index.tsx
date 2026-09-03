import { createFileRoute } from '@tanstack/react-router';
import Hero from '@/components/pages/home/hero';

export const Route = createFileRoute('/')({ component: Home });

function Home() {
	return <Hero />;
}
