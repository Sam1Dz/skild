---
argument-hint: 'in files src/components/Button.tsx src/hooks/useThing.ts'
description: 'Generate or update TSDoc comments for selected TypeScript and React files'
---

# TSDoc Generator

Generate TSDoc for files: $ARGUMENTS

## Files to Process

Processing the following files:

- `$ARGUMENTS`

## What This Command Does

1. **Reads each specified file** to understand the current code structure
2. **Identifies all exports** (functions, components, hooks, classes, types,
   interfaces)
3. **Adds or updates TSDoc comments** for each export following project
   conventions
4. **Preserves existing valid TSDoc** - only improves consistency and fills gaps
5. **Uses project-specific patterns** and idiomatic examples

## Project TSDoc Conventions

### What to Document (Scope)

**Always document:**

- React components (exported)
- Custom hooks
- Utility functions, helpers, formatters
- Shared types/interfaces reused across features

**Optional but encouraged:**

- Complex page/layout components
- Shared constants/config with non-obvious usage
- Business-critical actions/thunks

**Do NOT document:**

- Simple one-off implementations local to a single file
- Short, self-explanatory helpers when naming makes the purpose obvious

### Core TSDoc Tags

Use these standard TSDoc tags:

- `@param` – function/method parameters (use dash format:
  `@param foo - description`)
- `@returns` – return value (omit if return is void and obvious)
- `@remarks` – additional details, design notes, edge cases
- `@example` – usage examples (very helpful for components and hooks)
- `@deprecated` – for things you plan to remove
- `@internal` – for intentionally non-public surface
- `@beta` / `@alpha` – release stage
- Inline: `{@link Symbol}` – cross-references to other API items

### Comment Structure

Use this structure:

````ts
/**
 * Short summary sentence (no period at the end).
 *
 * Longer description with important notes or intent.
 *
 * @remarks
 * Optional section for design rationale, edge cases, and gotchas.
 *
 * @example
 * ```tsx
 * <MyComponent variant="outlined" disabled />
 * ```
 *
 * @param props - The component props.
 * @returns The rendered element.
 */
````

**Key points:**

- Use `@remarks`, not `@note` or `@description` (not standard TSDoc)
- Keep block tags at the start of lines
- Prefer dash after param name: `@param foo - description`
- No period at end of summary line

### React Specifics

Prefer TSDoc on the function/component rather than duplicating prop docs:

````tsx
/**
 * Primary call-to-action button used across the marketing site.
 *
 * @remarks
 * Renders as `<button>` and supports async onClick handlers.
 *
 * @example
 * ```tsx
 * <CtaButton onClick={handleBuy}>Buy now</CtaButton>
 * ```
 */
export function CtaButton({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  // ...
}
````

If exporting a reusable prop type:

```tsx
/**
 * Props for {@link CtaButton}.
 */
export interface CtaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Optional loading state; disables the button and shows a spinner. */
  loading?: boolean;
  /** Button style variant. Defaults to "primary". */
  variant?: 'primary' | 'secondary' | 'ghost';
}
```

## Command Behavior

When invoked, this command will:

1. Parse the file arguments from `$ARGUMENTS`
2. For each file:
   - Read the current file content
   - Identify all exports that need documentation
   - Add or update TSDoc comments following conventions
   - Preserve existing valid TSDoc (only improve consistency)
   - Edit the file with the updated documentation
3. Report any issues found

## Usage Examples

- `/tsdoc in files src/components/Button.tsx`
- `/tsdoc in files src/utils/helpers.ts src/lib/api.ts`
- `/tsdoc in files src/hooks/useTheme.ts src/components/Header.tsx`

## Important Notes

- **Non-destructive**: Existing valid TSDoc is preserved and only improved for consistency
- **Project idiomatic**: Examples and patterns match this codebase's style
- **Cross-references**: Uses `{@link}` to connect related APIs
- **Complete coverage**: All `@param` and `@returns` tags are included and accurate
