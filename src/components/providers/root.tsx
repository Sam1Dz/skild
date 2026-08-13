import { ThemeProvider } from '@/integrations/app-theme/provider';
import type { Theme } from '@/integrations/app-theme/server';
import { composeProviders } from './compose';

/** Adapts {@link ThemeProvider} to the `React.FC<PropsWithChildren>` shape expected by {@link composeProviders}. */
function AppThemeProvider({
	initialTheme,
	children,
}: React.PropsWithChildren<{ initialTheme: Theme }>) {
	return <ThemeProvider initialTheme={initialTheme}>{children}</ThemeProvider>;
}

/**
 * The application's single root provider, composing all context providers via
 * {@link composeProviders}.
 *
 * @example
 * ```tsx
 * <RootProvider initialTheme={initialTheme}>
 *   <App />
 * </RootProvider>
 * ```
 */
export const RootProvider = composeProviders(AppThemeProvider);
