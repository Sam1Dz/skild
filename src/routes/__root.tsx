import { TanStackDevtools } from '@tanstack/react-devtools';
import type { QueryClient } from '@tanstack/react-query';
import {
	createRootRouteWithContext,
	HeadContent,
	ScriptOnce,
	Scripts,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools';
import { getThemeFn } from '../lib/theme';
import appCss from '../styles/global.css?url';

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	beforeLoad: async () => ({ theme: await getThemeFn() }),
	head: () => ({
		meta: [
			{
				charSet: 'utf-8',
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{
				title: 'TanStack Start Starter',
			},
		],
		links: [
			{
				rel: 'stylesheet',
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const { theme } = Route.useRouteContext();
	const resolvedTheme = theme === 'system' ? undefined : theme;

	return (
		<html lang="en" suppressHydrationWarning className={resolvedTheme} data-theme={resolvedTheme}>
			<head>
				<ScriptOnce>
					{`(function(){try{if(${JSON.stringify(theme)}==='system'){var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var r=d?'dark':'light';var el=document.documentElement;el.classList.add(r);el.dataset.theme=r;el.style.colorScheme=r;}}catch(e){}})();`}
				</ScriptOnce>
				<HeadContent />
			</head>
			<body className="bg-surface font-sans">
				{children}
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
