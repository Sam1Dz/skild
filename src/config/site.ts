import { env } from '@/config/env';
import type { Theme } from '@/integrations/app-theme/server';
import { getResolveUrl } from '@/lib/utils';

const siteConfig = {
	name: 'Skild',
	title: {
		template: ' — Skild',
		default: 'Skild — The Registry for Agentic Intelligence',
	},
	description:
		'Discover, publish, and operate reusable agent capabilities from a route-driven workspace',
	url: env.VITE_SITE_URL,
	locale: 'en_US',
	themeColor: {
		light: '#f5f5f8',
		dark: '#060507',
	},
};

interface SeoMetadata {
	title?: string;
	description?: string;
	path?: string;
	noIndex?: boolean;
}

export function generateSeoMetadata(meta: SeoMetadata = {}) {
	const title = meta.title ? `${meta.title}${siteConfig.title.template}` : siteConfig.title.default;
	const description = meta.description || siteConfig.description;
	const url = getResolveUrl(meta.path ?? '/', siteConfig.url);

	return {
		meta: [
			{ title },
			{ name: 'description', content: description },
			{ name: 'robots', content: meta.noIndex ? 'noindex, nofollow' : 'index, follow' },
			{
				'script:ld+json': {
					'@context': 'https://schema.org',
					'@type': 'WebSite',
					name: siteConfig.name,
					description: siteConfig.description,
					url: siteConfig.url,
				},
			},
		],
		links: [{ rel: 'canonical', href: url }],
	};
}

export function metaThemeColor(resolvedTheme: Exclude<Theme, 'system'>) {
	const themeColor = siteConfig.themeColor[resolvedTheme ?? 'light'];

	return [{ name: 'theme-color', content: themeColor }];
}
