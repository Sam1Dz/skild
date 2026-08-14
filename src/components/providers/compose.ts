import * as React from 'react';

/**
 * Combines multiple provider components into a single component, nesting them
 * in the order given.
 *
 * @remarks
 * The first provider passed ends up outermost, wrapping the rest — equivalent to
 * writing `<A><B><C>{children}</C></B></A>` by hand.
 *
 * @example
 * ```tsx
 * const RootProvider = composeProviders(ThemeProvider, AuthProvider);
 * // <RootProvider>{children}</RootProvider>
 * // is equivalent to
 * // <ThemeProvider><AuthProvider>{children}</AuthProvider></ThemeProvider>
 * ```
 *
 * @param providers - The provider components to nest, outermost first.
 * @returns A single component that renders all providers nested around `children`.
 */
export function composeProviders<TProps extends React.PropsWithChildren>(
	...providers: React.FC<TProps>[]
): React.FC<TProps> {
	return ({ children, ...props }: TProps) => {
		return providers.reduceRight<React.ReactNode>(
			(child, Provider) => React.createElement(Provider, { ...(props as TProps) }, child),
			children
		);
	};
}
