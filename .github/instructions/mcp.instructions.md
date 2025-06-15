# MCP Development Guidelines

## Overview
Model Context Protocol server for Pantry Planner

## Development Rules  
- Use npm for package management
- Use vitest for testing
- TypeScript strict mode
- Run lint before commits: `npm run lint:fix`

## Testing
- Unit tests with Vitest
- 80%+ coverage required

## Commands
```bash
npm run lint:fix        # Biome linting
npm run test:cov        # Test with coverage
npm run build          # Production build
```