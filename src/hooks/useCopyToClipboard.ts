import * as React from 'react';

/** Fallback copy path for browsers without (or that reject) the async Clipboard API. */
function oldSchoolCopy(text: string) {
	const tempTextArea = document.createElement('textarea');
	tempTextArea.value = text;
	document.body.appendChild(tempTextArea);
	tempTextArea.select();
	document.execCommand('copy');
	document.body.removeChild(tempTextArea);
}

/**
 * Copies text to the clipboard and tracks the last successfully copied value.
 *
 * @remarks
 * Prefers the async Clipboard API and falls back to a hidden-textarea
 * `document.execCommand('copy')` when it's unavailable or throws.
 *
 * @example
 * ```tsx
 * const [copiedText, copy] = useCopyToClipboard();
 * <button onClick={() => copy('hello')}>Copy</button>
 * ```
 *
 * @returns A tuple of the last copied value (`null` until a copy succeeds) and a
 * function that copies the given text.
 */
export function useCopyToClipboard(): [string | null, (value: string) => Promise<void>] {
	const [state, setState] = React.useState<string | null>(null);

	const copyToClipboard = React.useCallback(async (value: string) => {
		try {
			if (navigator?.clipboard?.writeText) {
				await navigator.clipboard.writeText(value);
				setState(value);
			} else {
				throw new Error('writeText not supported');
			}
		} catch (_e) {
			oldSchoolCopy(value);
			setState(value);
		}
	}, []);

	return [state, copyToClipboard];
}
