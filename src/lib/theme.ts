import { createServerFn } from '@tanstack/react-start';
import { getCookie, setCookie } from '@tanstack/react-start/server';
import { z } from 'zod';

export const themeSchema = z.union([z.literal('light'), z.literal('dark'), z.literal('system')]);

export type Theme = z.infer<typeof themeSchema>;

const THEME_COOKIE = '_theme';

export const getThemeFn = createServerFn().handler(async () => {
	return themeSchema.catch('system').parse(getCookie(THEME_COOKIE));
});

export const setThemeFn = createServerFn({ method: 'POST' })
	.validator(themeSchema)
	.handler(async ({ data }) => {
		setCookie(THEME_COOKIE, data, {
			maxAge: 60 * 60 * 24 * 365,
			path: '/',
			sameSite: 'lax',
		});
	});
