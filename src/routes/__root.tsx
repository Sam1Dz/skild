import { TanStackDevtools } from '@tanstack/react-devtools';
import type { QueryClient } from '@tanstack/react-query';
import {
	createRootRouteWithContext,
	HeadContent,
	ScriptOnce,
	Scripts,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { RootProvider } from '@/components/providers/root';
import { generateSeoMetadata, metaThemeColor } from '../config/site';
import { getThemeInitScript } from '../integrations/app-theme/script';
import { getThemeFn } from '../integrations/app-theme/server';
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools';
import appCss from '../styles/global.css?url';

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	beforeLoad: async () => ({ theme: await getThemeFn() }),
	head: ctx => {
		const { theme } = ctx.match.context;
		const { meta, links } = generateSeoMetadata();
		return {
			meta: [
				{ charSet: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				...meta,
				...metaThemeColor(theme === 'dark' ? 'dark' : 'light'),
			],
			links: [{ rel: 'stylesheet', href: appCss }, ...links],
		};
	},
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const { theme } = Route.useRouteContext();
	const resolvedTheme = theme === 'system' ? undefined : theme;

	return (
		<html lang="en" suppressHydrationWarning className={resolvedTheme} data-theme={resolvedTheme}>
			<head>
				<ScriptOnce>{getThemeInitScript(theme)}</ScriptOnce>
				<HeadContent />
			</head>
			<body className="bg-surface font-sans">
				<RootProvider initialTheme={theme}>{children}</RootProvider>
				<TanStackDevtools
					config={{
						position: 'bottom-right',
					}}
					plugins={[
						{
							name: 'Tanstack Router',
							render: <TanStackRouterDevtoolsPanel />,
						},
						TanStackQueryDevtools,
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
