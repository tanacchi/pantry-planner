# Testing Guidelines

- API unit tests use Jest and API E2E tests validate module and HTTP behaviour.
- MCP tests use Vitest; browser tests use Playwright from `e2e/`.
- Test a public behaviour or regression risk rather than implementation details.
- Do not skip or delete a failing test: identify and fix the production defect.

```bash
pnpm --filter api test
pnpm --filter api test:e2e
cd e2e && pnpm run test
```
