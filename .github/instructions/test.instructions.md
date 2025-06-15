# Testing Guidelines

## Unit Testing Requirements
- **API**: Jest, 80%+ coverage, test controllers/services/repositories
- **MCP**: Vitest, 80%+ coverage
- **UI**: Jest + Testing Library, 80%+ coverage, use data-testid
- **E2E**: Playwright, test critical user flows

## Test Utilities
- **UI**: Use `/app/lib/test-utils.ts` for data-testid helpers
- **API**: Mock dependencies with factory functions
- **Coverage**: SonarCloud integration for monitoring

## Commands
```bash
# Run all tests
npm run test            # All unit tests
cd e2e && pnpm run test # E2E tests

# Coverage
npm run test:cov        # Unit test coverage
```