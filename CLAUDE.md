# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OmniStore POS - A NestJS backend for a grocery/retail point-of-sale system. Uses TypeORM with PostgreSQL and generates API structure from OpenAPI specs.

## Commands

```bash
# Development
npm run start:dev          # Start with hot reload
npm run start:debug        # Start with debugger

# Build
npm run build              # Compile TypeScript

# Testing
npm run test               # Run unit tests
npm run test:watch         # Run tests in watch mode
npm run test -- --testNamePattern="pattern"  # Run specific test
npm run test:e2e           # Run e2e tests (test/*.e2e-spec.ts)
npm run test:cov           # Run with coverage

# Code Quality
npm run lint               # ESLint with auto-fix
npm run format             # Prettier formatting

# Code Generation (from OpenAPI spec)
npm run generate:types     # Generate TypeScript types from openapi/api-spec.yaml
npm run generate:nestjs    # Generate NestJS modules/controllers/services
npm run generate:all       # Run both generators
```

## Architecture

### OpenAPI-First Code Generation

The project uses an OpenAPI-first approach:

1. **Source of truth**: `openapi/api-spec.yaml` defines all API endpoints and schemas
2. **Code generator**: `scripts/generate-nestjs.js` reads the spec and generates:
   - Feature modules in `src/generated/` (auth, products, sales, customers, etc.)
   - Each module contains: controller, service, DTOs, and TypeORM entities
3. **Type generation**: `openapi-typescript` generates `src/generated/api-types.ts`

### Module Structure

```
src/
├── app.module.ts           # Root module - imports ConfigModule + GeneratedApiModule
├── main.ts                 # Bootstrap with Swagger, validation, CORS
├── config/                 # Configuration (database, app settings, Joi validation)
└── generated/              # Auto-generated from OpenAPI spec
    ├── generated-api.module.ts  # Aggregates all feature modules + TypeORM setup
    └── [feature]/               # e.g., products/, sales/, auth/
        ├── [feature].module.ts
        ├── [feature].controller.ts
        ├── [feature].service.ts  # Contains TODO stubs for implementation
        ├── dto/                  # Request/response DTOs with class-validator
        └── entities/             # TypeORM entities
```

### Key Patterns

- **Services have stub implementations**: Generated services throw `Error('Method not implemented')` - these need actual implementation
- **TypeORM entities**: Use UUID primary keys, automatic timestamps (`created_at`, `updated_at`)
- **Validation**: Global ValidationPipe with `whitelist: true`, `forbidNonWhitelisted: true`, `transform: true`
- **API prefix**: All routes prefixed with `/api` (configurable via `APP_API_PREFIX`)
- **Swagger**: Available at `/api/docs` in non-production environments

### Environment Variables

Required in `.env`:
- `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE` - PostgreSQL connection
- `NODE_ENV` - Controls logging, Swagger visibility, TypeORM synchronize
- `APP_PORT`, `APP_API_PREFIX` - Server configuration
