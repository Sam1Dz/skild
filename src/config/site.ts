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
		links: [
			{ rel: 'canonical', href: url },
			{ rel: 'icon', href: '/favicon/favicon.ico', sizes: 'any' },
			{ rel: 'icon', type: 'image/svg+xml', href: '/favicon/favicon.svg' },
			{ rel: 'icon', type: 'image/png', href: '/favicon/favicon-96x96.png', sizes: '96x96' },
			{ rel: 'apple-touch-icon', href: '/favicon/apple-touch-icon.png' },
			{ rel: 'manifest', href: '/favicon/site.webmanifest' },
		],
	};
}

export function getThemeColor(resolvedTheme: Exclude<Theme, 'system'>) {
	return siteConfig.themeColor[resolvedTheme];
}

export function metaThemeColor(resolvedTheme: Exclude<Theme, 'system'>) {
	return [{ name: 'theme-color', content: getThemeColor(resolvedTheme) }];
}
