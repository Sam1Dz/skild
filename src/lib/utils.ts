/**
 * Resolves a path against a base URL and returns the absolute URL as a string.
 *
 * @param path - The relative or absolute path to resolve.
 * @param url - The base URL to resolve `path` against.
 * @returns The resolved absolute URL.
 */
export function getResolveUrl(path: string, url: string) {
	return new URL(path, url).toString();
}
