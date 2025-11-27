.PHONY: dev build start lint clean install test check help

# Default target
help:
	@echo "xinfras - Documentation Website"
	@echo ""
	@echo "Usage:"
	@echo "  make install    Install dependencies"
	@echo "  make dev        Start development server"
	@echo "  make build      Build for production"
	@echo "  make start      Start production server"
	@echo "  make lint       Run linter"
	@echo "  make check      Run lint and type checks"
	@echo "  make clean      Clean build artifacts"
	@echo "  make test       Run tests (placeholder)"
	@echo ""

# Install dependencies
install:
	npm install

# Start development server
dev:
	npx next dev

# Build for production
build:
	npx next build

# Start production server (requires build first)
start:
	npx next start

# Run linter
lint:
	npx eslint . --fix

# Run all checks
check: lint
	npx tsc --noEmit

# Clean build artifacts
clean:
	rm -rf .next
	rm -rf node_modules/.cache

# Run tests (placeholder for future)
test:
	@echo "No tests configured yet"

# Format code (if prettier is added)
format:
	npx prettier --write "src/**/*.{ts,tsx,css}"

# Build and start (convenience)
prod: build start
