# MCP Development Guidelines

Model Context Protocol server for Pantry Planner.

- Use pnpm and TypeScript strict mode.
- Run Biome and the TypeScript compiler before committing.

```bash
pnpm --filter pantry-planner-mcp lint:fix
pnpm --filter pantry-planner-mcp typecheck
pnpm --filter pantry-planner-mcp build
```
