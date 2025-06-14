# Pantry Planner Development Commands
# Usage: just <command>
# Install: https://github.com/casey/just

# Show available commands
default:
    @just --list

# Setup all projects
setup:
    @echo "🔧 Setting up all projects..."
    pnpm install
    cd api && pnpm install
    cd mcp && pnpm install
    cd ui && pnpm install
    cd e2e && pnpm install
    cd e2e && pnpm exec playwright install --with-deps
    @echo "✅ Setup complete!"

# Install dependencies for all projects
install: setup

# Lint all projects
lint:
    @echo "🔍 Running lint on all projects..."
    @echo "📁 API"
    cd api && pnpm run lint
    @echo "📁 MCP"
    cd mcp && pnpm run lint
    @echo "📁 UI"
    cd ui && pnpm run lint
    @echo "📁 E2E"
    cd e2e && pnpm run lint
    @echo "✅ Lint complete!"

# Fix lint issues
lint-fix:
    @echo "🔧 Fixing lint issues..."
    cd api && pnpm run lint:biome:fix
    cd mcp && pnpm run lint:fix
    cd ui && pnpm run lint:biome:fix
    cd e2e && pnpm run lint:fix
    @echo "✅ Lint fix complete!"

# Run unit tests with coverage (excluding E2E)
test:
    @echo "🧪 Running tests with coverage..."
    @echo "📁 API"
    cd api && pnpm run test:cov
    @echo "📁 MCP"
    cd mcp && pnpm run test:cov
    @echo "📁 UI"
    cd ui && pnpm run test:cov
    @echo "✅ Tests complete!"

# Run unit tests in watch mode
test-watch:
    @echo "🧪 Running tests in watch mode..."
    @echo "Choose project: [a]pi [m]cp [u]i"
    @read -p "Project: " choice; \
    case $$choice in \
        a|api) cd api && pnpm run test:watch ;; \
        m|mcp) cd mcp && pnpm run test:watch ;; \
        u|ui) cd ui && pnpm run test:watch ;; \
        *) echo "Invalid choice" ;; \
    esac

# Run E2E tests (requires servers to be running)
test-e2e:
    @echo "🧪 Running E2E tests..."
    cd e2e && pnpm run test
    @echo "✅ E2E tests complete!"

# Run all tests including E2E (requires servers)
test-all: test test-e2e

# Build all projects
build:
    @echo "🏗️  Building all projects..."
    @echo "📁 API"
    cd api && pnpm run build
    @echo "📁 MCP"
    cd mcp && pnpm run build
    @echo "📁 UI"
    cd ui && pnpm run build
    @echo "✅ Build complete!"

# TypeCheck all projects
typecheck:
    @echo "🔍 Running TypeScript checks..."
    @echo "📁 UI"
    cd ui && pnpm run typecheck
    @echo "📁 E2E"
    cd e2e && pnpm exec tsc --noEmit
    @echo "✅ TypeCheck complete!"

# Start API server
start-api:
    @echo "🚀 Starting API server..."
    cd api && pnpm run start:dev

# Start UI server
start-ui:
    @echo "🚀 Starting UI server..."
    cd ui && pnpm run dev

# Start all servers in background
start-all:
    @echo "🚀 Starting all servers..."
    cd api && pnpm run start:dev &
    cd ui && pnpm run dev &
    @echo "✅ Servers started in background"
    @echo "API: http://localhost:8000"
    @echo "UI: http://localhost:5173"

# Stop all servers
stop-all:
    @echo "🛑 Stopping all servers..."
    pkill -f "pnpm run start:dev" || true
    pkill -f "pnpm run dev" || true
    @echo "✅ Servers stopped!"

# Setup database
db-setup:
    @echo "🗄️  Setting up database..."
    cd api && pnpm exec prisma generate
    cd api && pnpm exec prisma db seed
    @echo "✅ Database setup complete!"

# Open Prisma Studio
db-studio:
    @echo "🗄️  Opening Prisma Studio..."
    cd api && pnpm exec prisma studio

# Full development setup
dev-setup: setup db-setup
    @echo "🎉 Development environment ready!"

# Run full CI pipeline locally
ci: lint typecheck test build
    @echo "✅ CI pipeline complete!"

# Development workflow with servers
dev: start-all
    @echo "🎯 Development mode started!"
    @echo "Press Ctrl+C to stop all servers"

# Clean all build artifacts and node_modules
clean:
    @echo "🧹 Cleaning all projects..."
    rm -rf node_modules
    rm -rf api/node_modules api/dist api/coverage
    rm -rf mcp/node_modules mcp/build mcp/coverage
    rm -rf ui/node_modules ui/build ui/coverage
    rm -rf e2e/node_modules e2e/playwright-report e2e/test-results
    @echo "✅ Cleanup complete!"

# Generate OpenAPI clients
generate:
    @echo "🔄 Generating OpenAPI clients..."
    cd mcp && pnpm run openapi-gen
    cd ui && pnpm run openapi-gen
    @echo "✅ Generation complete!"

# Show project status
status:
    @echo "📊 Project Status"
    @echo "=================="
    @echo "API Server: $(curl -s http://localhost:8000/health >/dev/null && echo '✅ Running' || echo '❌ Stopped')"
    @echo "UI Server:  $(curl -s http://localhost:5173 >/dev/null && echo '✅ Running' || echo '❌ Stopped')"
    @echo ""
    @echo "Dependencies:"
    @echo "- Node.js: $(node --version 2>/dev/null || echo 'Not installed')"
    @echo "- pnpm: $(pnpm --version 2>/dev/null || echo 'Not installed')"
    @echo "- Docker: $(docker --version 2>/dev/null | cut -d' ' -f3 | sed 's/,//' || echo 'Not installed')"

# Help for common tasks
help:
    @echo "🚀 Pantry Planner Development Guide"
    @echo "===================================="
    @echo ""
    @echo "Quick Start:"
    @echo "  just dev-setup    # First time setup"
    @echo "  just dev          # Start development servers"
    @echo ""
    @echo "Development:"
    @echo "  just lint         # Check code quality"
    @echo "  just test         # Run unit tests"
    @echo "  just build        # Build all projects"
    @echo ""
    @echo "Servers:"
    @echo "  just start-api    # Start API only"
    @echo "  just start-ui     # Start UI only"
    @echo "  just start-all    # Start all servers"
    @echo "  just stop-all     # Stop all servers"
    @echo ""
    @echo "Database:"
    @echo "  just db-setup     # Setup database"
    @echo "  just db-studio    # Open Prisma Studio"
    @echo ""
    @echo "Maintenance:"
    @echo "  just clean        # Clean all artifacts"
    @echo "  just status       # Show server status"
