# UI Development Guidelines

## Overview
Remix + React + Tailwind CSS UI for Pantry Planner

## Development Rules
- Use npm for package management
- Add data-testid to all interactive elements
- Follow mobile-first responsive design
- Run lint and typecheck: `npm run lint && npm run typecheck`

## Testing
- Unit tests with Jest + Testing Library
- 80%+ coverage required
- Use testUtils for data-testid helpers

## Commands
```bash
npm run lint:biome:fix  # Biome linting
npm run test:cov        # Test with coverage
npm run build          # Production build
```