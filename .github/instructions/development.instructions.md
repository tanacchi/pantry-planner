# Development Guide

Use pnpm from the repository root. `just` is an optional shortcut for the same commands.

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm build
```

Useful commands:

```bash
just test
just test-e2e
just start-api
just db-seed-e2e
```

The workspace packages are `api`, `pantry-planner-ui`, `pantry-planner-e2e`, and
`pantry-planner-mcp`; use those names with `pnpm --filter`.
