# API Development Guidelines

## Overview
NestJS + Prisma + PostgreSQL API for Pantry Planner

## Development Rules
- Use npm for package management
- Run lint and tests before commits: `npm run lint && npm run test`
- Follow clean architecture (domain, application, infrastructure)
- Use DTO mapping and proper validation

## Testing
- Unit tests with Jest
- 80%+ coverage required
- Test all controllers, services, repositories
- Mock external dependencies

## Commands
```bash
npm run lint:biome:fix  # Biome linting
npm run test:cov        # Test with coverage
npm run build          # Production build
```