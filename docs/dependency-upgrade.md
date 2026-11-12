# Dependency upgrade — November 12, 2026

All registry dependencies and overrides in both workspaces were checked against live npm release metadata. Targets are the newest stable releases at least 48 hours old. Compatible indirect dependencies were refreshed with `bun update`, using the existing two-day filter in `bunfig.toml`. Indirect packages retain the version ranges required by their owners; direct packages and overrides are pinned exactly.

## Runtime and TypeScript migration

**Package:** Node 24.21.0 → 26.13.0; Bun 1.4.2 → 1.4.4; TypeScript 6.0.3 → 7.0.2 plus compatibility API.

**Why it is drastic:** Node crosses a major version. TypeScript 7 removes `baseUrl` and does not expose the compiler API required by Astro and ESLint.

**Migration done:** Updated `.nvmrc`, `mise.toml`, package-manager and engine settings, and README instructions. Added native TypeScript 7 as `typescript-native`, and aliased `typescript` to the latest `@typescript/typescript6` compatibility package, 6.0.2 (which resolves the 6.0.3 API). Added native checking to the existing check/build scripts. Changed every path alias to use an explicit relative path, removing `baseUrl`. The alias name avoids the incompatible optional `@typescript/native` peer expected by typescript-eslint for TypeScript 7.1 prereleases.

**Verification:** Native `tsc` reports 7.0.2; `tsc6` reports 6.0.3. Both checkers and the production build passed on Node 26.13.0 and Bun 1.4.4.

**Remaining risk:** Astro and ESLint still need the compatibility API until their upstream support changes. Hosted deployment is intentionally disabled. Revert the upgrade commits together to restore the previous toolchain.

## Framework, UI, and tooling

**Package:** Astro, its integrations, React, Tailwind, lint/format tools, Playwright, and the listed overrides.

**Why it is drastic:** Shared framework and browser-tool changes need coordinated installs and full behavior checks.

**Migration done:** Updated related packages together, refreshed compatible indirect dependencies, pinned minimatch instead of its former range, and updated the immutable `actions/setup-node` SHA to v7.1.0. Existing application APIs remain supported; no further component rewrites were needed.

**Verification:** Frozen install, security audit, formatting, lint, native/Astro checks, build, and unit/site tests passed. All 95 browser tests and 15 publication tests passed; results are recorded below. Checked 130 resolved peer requirements with no missing or incompatible required peers. All 234 new or changed lockfile entries have verified publish dates at least 48 hours old.

**Remaining risk:** Local browser tests cover desktop Chromium, Firefox, WebKit, mobile Chromium, and mobile WebKit; they do not verify a hosted deployment.

## Package outcomes

| Package                                   | Before           | Selected                  | Published (UTC) | Outcome                         |
| ----------------------------------------- | ---------------- | ------------------------- | --------------- | ------------------------------- |
| `husky`                                   | 9.1.7            | 9.1.7                     | 2024-11-18      | Already current                 |
| `lint-staged`                             | 17.5.1           | 17.6.0                    | 2026-09-26      | Updated                         |
| `turbo`                                   | 2.10.13          | 2.11.10                   | 2026-10-20      | Updated; newer release deferred |
| `prettier`                                | 3.9.8            | 3.9.10                    | 2026-10-10      | Updated; newer release deferred |
| `prettier-plugin-astro`                   | 1.0.1            | 1.1.2                     | 2026-10-23      | Updated                         |
| `eslint`                                  | 10.13.0          | 10.14.0                   | 2026-10-30      | Updated                         |
| `@eslint/js`                              | 10.0.1           | 10.0.1                    | 2026-02-06      | Already current                 |
| `typescript-eslint`                       | 8.70.0           | 8.72.2                    | 2026-11-09      | Updated                         |
| `eslint-plugin-astro`                     | 3.2.1            | 3.2.1                     | 2026-09-17      | Already current                 |
| `eslint-config-prettier`                  | 10.1.8           | 10.1.8                    | 2025-07-18      | Already current                 |
| `globals`                                 | 17.12.0          | 17.14.0                   | 2026-11-01      | Updated                         |
| `eslint-plugin-react-hooks`               | 7.1.1            | 7.1.1                     | 2026-04-17      | Already current                 |
| `eslint-plugin-jsx-a11y-x`                | 0.2.0            | 0.2.0                     | 2026-05-10      | Already current                 |
| `postcss-selector-parser`                 | 7.1.6            | 7.2.0                     | 2026-11-08      | Updated                         |
| `fast-xml-parser`                         | 5.12.0           | 5.12.0                    | 2026-11-03      | Already current                 |
| `minimatch`                               | >=11.0.1 <11.1.0 | 11.0.5                    | 2026-11-05      | Updated; newer release deferred |
| `@astrojs/check`                          | 0.9.12           | 0.9.12                    | 2026-10-21      | Already current                 |
| `@astrojs/markdown-remark`                | 7.3.1            | 7.3.6                     | 2026-11-05      | Updated; newer release deferred |
| `@astrojs/mdx`                            | 8.0.1            | 8.1.3                     | 2026-11-05      | Updated; newer release deferred |
| `@astrojs/rss`                            | 4.0.19           | 4.0.19                    | 2026-06-30      | Already current                 |
| `@fontsource-variable/source-serif-4`     | 5.3.0            | 5.3.1                     | 2026-10-11      | Updated                         |
| `@resvg/resvg-js`                         | 2.6.2            | 2.6.2                     | 2024-03-26      | Already current                 |
| `@vercel/analytics`                       | 2.0.1            | 2.0.1                     | 2026-03-12      | Already current                 |
| `astro`                                   | 7.4.2            | 7.4.8                     | 2026-11-09      | Updated; newer release deferred |
| `astro-seo`                               | 1.2.0            | 1.2.0                     | 2026-08-28      | Already current                 |
| `fuse.js`                                 | 7.5.0            | 7.5.0                     | 2026-07-13      | Already current                 |
| `github-slugger`                          | 2.0.0            | 2.0.0                     | 2022-10-27      | Already current                 |
| `mdast-util-to-string`                    | 4.0.0            | 4.0.0                     | 2023-07-07      | Already current                 |
| `reading-time`                            | 1.5.0            | 1.5.0                     | 2021-09-10      | Already current                 |
| `rehype-plugin-image-native-lazy-loading` | 1.2.0            | 1.2.0                     | 2021-02-28      | Already current                 |
| `tailwindcss`                             | 4.3.3            | 4.3.5                     | 2026-11-06      | Updated                         |
| `@astrojs/react`                          | 7.1.1            | 7.1.5                     | 2026-11-09      | Updated; newer release deferred |
| `@astrojs/sitemap`                        | 3.7.4            | 3.7.4                     | 2026-08-31      | Already current                 |
| `@tailwindcss/typography`                 | 0.5.20           | 0.5.20                    | 2026-06-08      | Already current                 |
| `@tailwindcss/vite`                       | 4.3.3            | 4.3.5                     | 2026-11-06      | Updated                         |
| `@types/react`                            | 19.3.0           | 19.3.0                    | 2026-09-09      | Already current                 |
| `@types/react-dom`                        | 19.3.0           | 19.3.0                    | 2026-09-09      | Already current                 |
| `react`                                   | 19.3.0           | 19.3.1                    | 2026-10-14      | Updated                         |
| `react-dom`                               | 19.3.0           | 19.3.1                    | 2026-10-14      | Updated                         |
| `sharp`                                   | 0.35.5           | 0.35.5                    | 2026-09-27      | Already current                 |
| `typescript`                              | 6.0.3            | 7.0.2 + API compatibility | 2026-07-08      | Migrated (see above)            |
| `@playwright/test`                        | 1.63.0           | 1.65.0                    | 2026-11-05      | Updated                         |

| Tool / CI action   | Before  | Selected | Outcome                     |
| ------------------ | ------- | -------- | --------------------------- |
| Node               | 24.21.0 | 26.13.0  | Updated; 26.13.1 deferred   |
| Bun                | 1.4.2   | 1.4.4    | Updated                     |
| actions/setup-node | 7.0.0   | 7.1.0    | Updated; SHA pinned         |
| actions/checkout   | 7.0.1   | 7.0.1    | Already current; SHA pinned |
| oven-sh/setup-bun  | 2.2.0   | 2.2.0    | Already current; SHA pinned |

## Newest releases deferred by the two-day rule

| Package                    | Newest version | npm publish time (UTC)   | Selected |
| -------------------------- | -------------- | ------------------------ | -------- |
| `node`                     | 26.13.1        | 2026-11-12T00:40:43.425Z | 26.13.0  |
| `turbo`                    | 2.11.11        | 2026-11-11T18:30:55.624Z | 2.11.10  |
| `prettier`                 | 3.10.1         | 2026-11-12T07:06:22.298Z | 3.9.10   |
| `minimatch`                | 11.0.8         | 2026-11-11T09:50:19.549Z | 11.0.5   |
| `@astrojs/markdown-remark` | 7.3.8          | 2026-11-11T17:35:39.844Z | 7.3.6    |
| `@astrojs/mdx`             | 8.1.5          | 2026-11-11T17:34:52.582Z | 8.1.3    |
| `astro`                    | 7.4.11         | 2026-11-11T17:35:49.396Z | 7.4.8    |
| `@astrojs/react`           | 7.1.8          | 2026-11-11T17:35:45.827Z | 7.1.5    |

The newer Node release includes security fixes but is still inside the user-required waiting period. No release-age exceptions were made. The unchanged `fast-xml-parser` override remains pinned to the patched 5.12.0 release.

## Verification results

- Baseline: 12 unit, 5 site, 15 publication, and 95 browser tests passed before dependency upgrades.
- Final: frozen install, audit (zero advisories), formatting, lint, both type checkers, production build, 12 unit tests, and 5 site tests passed.
- Final: 15 publication scenario tests and all 95 browser tests passed (127 tests in total).

## Primary sources

- [TypeScript 7 migration and compatibility aliases](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/)
- [Astro changelog](https://github.com/withastro/astro/blob/main/packages/astro/CHANGELOG.md)
- [Astro MDX changelog](https://github.com/withastro/astro/blob/main/packages/integrations/mdx/CHANGELOG.md)
- [Astro React changelog](https://github.com/withastro/astro/blob/main/packages/integrations/react/CHANGELOG.md)
- [Astro Markdown changelog](https://github.com/withastro/astro/blob/main/packages/markdown/remark/CHANGELOG.md)
- [React changelog](https://github.com/facebook/react/blob/main/CHANGELOG.md)
- [Tailwind changelog](https://github.com/tailwindlabs/tailwindcss/blob/main/CHANGELOG.md)
- [Playwright 1.65 release](https://github.com/microsoft/playwright/releases/tag/v1.65.0)
- [ESLint 10.14 release](https://github.com/eslint/eslint/releases/tag/v10.14.0)
- [typescript-eslint 8.72.2 release](https://github.com/typescript-eslint/typescript-eslint/releases/tag/v8.72.2)
- [Prettier changelog](https://github.com/prettier/prettier/blob/main/CHANGELOG.md)
- [Astro Prettier plugin changelog](https://github.com/withastro/prettier-plugin-astro/blob/main/CHANGELOG.md)
- [lint-staged changelog](https://github.com/lint-staged/lint-staged/blob/main/CHANGELOG.md)
- [Turborepo release](https://github.com/vercel/turborepo/releases/tag/v2.11.10)
- [Selector parser changelog](https://github.com/postcss/postcss-selector-parser/blob/master/CHANGELOG.md)
- [Node releases](https://nodejs.org/dist/index.json)
- [Bun release](https://github.com/oven-sh/bun/releases/tag/bun-v1.4.4)
- [setup-node 7.1 release](https://github.com/actions/setup-node/releases/tag/v7.1.0)
- Package versions and precise publish times: npm registry metadata for each named package.
