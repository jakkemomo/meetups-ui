COMPOSE = docker compose

# Run tests
test:
	${COMPOSE} run --rm dev npm test

lint:
	${COMPOSE} run --rm dev npm lint

# Build artifact for production
build:
	${COMPOSE} run --rm prod npm run build

# Build artifact for production
dev:
	${COMPOSE} up dev || true

dev-demon:
	${COMPOSE} up -d dev

docker-build:
	${COMPOSE} build dev

docker-rm:
	${COMPOSE} rm dev

download_node_modules:
	${COMPOSE} up -d dev
	${COMPOSE} cp dev:/usr/src/app/node_modules ./node_modules
	${COMPOSE} stop dev

# Clean up artifacts
clean:
	rm -rf build/

# Default target (run tests and build)
all: lint test build
