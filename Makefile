COMPOSE = docker compose

# Run tests
test:
	${COMPOSE} run --rm dev npm test

# Build artifact for production
build:
	${COMPOSE} run --rm prod npm run build

# Build artifact for production
dev:
	${COMPOSE} up dev

dev-demon:
	${COMPOSE} up -d dev

# Clean up artifacts
clean:
	rm -rf build/

# Default target (run tests and build)
all: test build
