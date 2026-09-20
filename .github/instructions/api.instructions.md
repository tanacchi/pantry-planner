# API Development Guidelines

NestJS + Prisma API for Pantry Planner.

- Use pnpm for package management.
- Preserve the `test` gate: it runs coverage and API E2E tests.
- Keep constructor-injected Nest providers as value imports; `api/**` disables Biome's `useImportType` for DI metadata.
- Before committing, run `pnpm --filter api lint`, `pnpm --filter api typecheck`, and `pnpm --filter api test`.

```bash
pnpm --filter api lint:biome:fix
pnpm --filter api test:cov
pnpm --filter api build
```
