.PHONY: install test test-headed test-ui test-debug report clean setup lint lint-fix dev ci

# Install dependencies and setup
install:
	pnpm run setup

# Quick setup for development
setup:
	pnpm run setup

# Full development setup and start servers
dev:
	pnpm run dev

# CI pipeline
ci:
	pnpm run ci

# Run all E2E tests
test:
	pnpm test

# Run tests in headed mode (visible browser)
test-headed:
	pnpm run test:headed

# Run tests with Playwright UI
test-ui:
	pnpm run test:ui

# Run tests in debug mode
test-debug:
	pnpm run test:debug

# Run all projects in parallel
test-all-projects:
	pnpm run test:all-projects

# Run specific projects
test-chromium:
	pnpm run test:chromium

test-webkit:
	pnpm run test:webkit

test-mobile-chrome:
	pnpm run test:mobile-chrome

test-mobile-safari:
	pnpm run test:mobile-safari


# Run specific test file
test-file:
	npx playwright test $(FILE)

# Show test report
report:
	pnpm run report

# Lint commands
lint:
	pnpm run lint

lint-fix:
	pnpm run lint:fix

lint-check:
	pnpm run lint:check

# Server management
servers-start:
	pnpm run servers:start

servers-stop:
	pnpm run servers:stop

# Clean up
clean:
	pnpm run clean

clean-reports:
	pnpm run clean:reports

clean-results:
	pnpm run clean:results

clean-deps:
	pnpm run clean:deps

# Update Playwright
update:
	npm update @playwright/test
	npx playwright install

# Check Playwright installation
check:
	npx playwright --version
	npx playwright install --dry-run

# Help
help:
	@echo "Available commands:"
	@echo "  install         - Install dependencies and setup"
	@echo "  setup           - Quick setup for development"
	@echo "  dev             - Full development setup and start servers"
	@echo "  ci              - Run CI pipeline"
	@echo ""
	@echo "Testing:"
	@echo "  test            - Run all E2E tests"
	@echo "  test-headed     - Run tests in headed mode"
	@echo "  test-ui         - Run tests with Playwright UI"
	@echo "  test-debug      - Run tests in debug mode"
	@echo "  test-all-projects - Run all projects in parallel"
	@echo "  test-chromium   - Run Chromium tests only"
	@echo "  test-webkit     - Run WebKit tests only"
	@echo "  test-mobile-*   - Run mobile tests"
	@echo ""
	@echo "Linting:"
	@echo "  lint            - Run lint checks"
	@echo "  lint-fix        - Fix lint issues"
	@echo "  lint-check      - Strict lint check for CI"
	@echo ""
	@echo "Servers:"
	@echo "  servers-start   - Start API and UI servers"
	@echo "  servers-stop    - Stop servers"
	@echo ""
	@echo "Cleanup:"
	@echo "  clean           - Clean all generated files"
	@echo "  clean-reports   - Clean test reports only"
	@echo "  clean-results   - Clean test results only"
	@echo "  clean-deps      - Clean dependencies only"