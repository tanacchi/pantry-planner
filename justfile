default:
    @just --list

install:
    pnpm install

lint:
    pnpm lint

typecheck:
    pnpm typecheck

build:
    pnpm build

test:
    pnpm --filter api test

test-e2e:
    cd e2e && pnpm run test

start-api:
    pnpm --filter api start:dev

start-ui:
    pnpm --filter pantry-planner-ui dev

db-push:
    pnpm --filter api db:push

db-seed:
    pnpm --filter api db:seed

db-seed-e2e:
    pnpm --filter api db:seed:e2e

db-studio:
    pnpm --filter api db:studio

ci: lint typecheck build
