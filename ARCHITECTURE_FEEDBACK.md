# OmniStore POS - Architecture Analysis & Recommendations

## Table of Contents
1. [Current State Analysis](#current-state-analysis)
2. [Issues & Technical Debt](#issues--technical-debt)
3. [Recommended Architecture](#recommended-architecture)
4. [Required Packages](#required-packages)
5. [Implementation Roadmap](#implementation-roadmap)

---

## Current State Analysis

### Project Overview
- **Framework**: NestJS 11.0 with TypeORM
- **Database**: PostgreSQL
- **Approach**: OpenAPI-first code generation
- **Status**: Skeleton implementation (~10% business logic complete)

### What's Working Well

| Component | Status | Notes |
|-----------|--------|-------|
| OpenAPI Spec | Complete | Well-defined API contracts |
| Code Generation | Complete | Auto-generates modules/DTOs/entities |
| Controllers | 100% | All REST endpoints defined |
| DTOs | 100% | Validation decorators applied |
| Entities | 100% | TypeORM models ready |
| Swagger Docs | Complete | Auto-generated at `/api/docs` |
| Services | ~10% | Only Partners partially implemented |

### Current Module Structure
```
src/generated/
├── auth/           # User authentication (PIN-based)
├── products/       # Inventory management
├── sales/          # POS transactions
├── customers/      # Customer management
├── suppliers/      # Supply chain
├── partners/       # Capital management (partial impl)
├── finance/        # Expense tracking
├── assets/         # Fixed assets
├── users/          # User management
└── marketing/      # AI campaigns
```

---

## Issues & Technical Debt

### Critical Issues

#### 1. No Database Relationships
**Current**: Entities use string arrays for relationships
```typescript
// Current (Bad)
@Column('simple-array', { nullable: true })
supplierIds?: string[];
```
**Problem**: No referential integrity, no cascade operations, no JOINs

#### 2. No Authentication/Authorization
- PIN field exists but no auth implementation
- No JWT/session management
- No role-based access control (RBAC)
- No route guards

#### 3. No Transaction Management
- Sales operations need ACID transactions
- Stock adjustments without transactions = data corruption risk
- Partner capital operations need atomicity

#### 4. Missing Error Handling
- No custom exception filters
- No standardized error responses
- No validation error formatting

### Structural Issues

#### 5. Flat Module Organization
**Current**: All modules at same level
```
generated/
├── auth/
├── products/
├── sales/
...
```
**Problem**: ERP systems need domain-driven design with bounded contexts

#### 6. No Shared/Common Module
- No base entity class
- No common DTOs (pagination, responses)
- No shared utilities

#### 7. Missing Audit Trail
- No soft deletes
- No change history
- No user action logging

#### 8. Security Vulnerabilities
| Issue | Risk Level |
|-------|------------|
| CORS open to all origins | High |
| No rate limiting | High |
| No password hashing | Critical |
| No input sanitization | Medium |
| No request logging | Medium |

### Data Model Issues

#### 9. Nullable Everything
Most entity fields are nullable - business rules should enforce required fields:
```typescript
// Current
@Column({ type: 'varchar', nullable: true })
name?: string;

// Should be
@Column({ type: 'varchar' })
name: string;
```

#### 10. No Database Indexes
- No indexes on frequently queried fields
- No composite indexes for common queries
- Performance will degrade with data growth

---

## Recommended Architecture

### Domain-Driven Design (DDD) Structure

```
src/
├── main.ts
├── app.module.ts
│
├── core/                           # Core infrastructure
│   ├── core.module.ts
│   ├── database/
│   │   ├── database.module.ts
│   │   ├── base.entity.ts          # UUID, timestamps, soft-delete
│   │   └── migrations/
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   ├── strategies/
│   │   │   └── jwt.strategy.ts
│   │   ├── decorators/
│   │   │   ├── current-user.decorator.ts
│   │   │   └── roles.decorator.ts
│   │   └── services/
│   │       └── auth.service.ts
│   ├── filters/
│   │   ├── http-exception.filter.ts
│   │   └── validation-exception.filter.ts
│   ├── interceptors/
│   │   ├── logging.interceptor.ts
│   │   ├── transform.interceptor.ts
│   │   └── timeout.interceptor.ts
│   └── common/
│       ├── dto/
│       │   ├── pagination.dto.ts
│       │   ├── api-response.dto.ts
│       │   └── query-filter.dto.ts
│       └── interfaces/
│           └── paginated-result.interface.ts
│
├── modules/                        # Business domains
│   │
│   ├── inventory/                  # Bounded Context: Inventory
│   │   ├── inventory.module.ts
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   ├── product.entity.ts
│   │   │   │   ├── category.entity.ts
│   │   │   │   └── stock-movement.entity.ts
│   │   │   └── value-objects/
│   │   │       ├── money.vo.ts
│   │   │       └── sku.vo.ts
│   │   ├── application/
│   │   │   ├── services/
│   │   │   │   ├── product.service.ts
│   │   │   │   └── stock.service.ts
│   │   │   └── commands/
│   │   │       ├── create-product.command.ts
│   │   │       └── adjust-stock.command.ts
│   │   ├── infrastructure/
│   │   │   └── repositories/
│   │   │       └── product.repository.ts
│   │   └── presentation/
│   │       ├── controllers/
│   │       │   └── products.controller.ts
│   │       └── dto/
│   │           ├── product.dto.ts
│   │           └── stock-adjustment.dto.ts
│   │
│   ├── sales/                      # Bounded Context: Sales/POS
│   │   ├── sales.module.ts
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   ├── sale.entity.ts
│   │   │   │   ├── sale-item.entity.ts
│   │   │   │   └── payment.entity.ts
│   │   │   ├── events/
│   │   │   │   └── sale-completed.event.ts
│   │   │   └── services/
│   │   │       └── sale-domain.service.ts
│   │   ├── application/
│   │   │   ├── services/
│   │   │   │   ├── sale.service.ts
│   │   │   │   └── receipt.service.ts
│   │   │   └── saga/
│   │   │       └── sale.saga.ts
│   │   ├── infrastructure/
│   │   │   └── repositories/
│   │   └── presentation/
│   │       ├── controllers/
│   │       └── dto/
│   │
│   ├── crm/                        # Bounded Context: Customer Relations
│   │   ├── crm.module.ts
│   │   ├── domain/
│   │   │   └── entities/
│   │   │       ├── customer.entity.ts
│   │   │       └── loyalty-points.entity.ts
│   │   └── ...
│   │
│   ├── supply-chain/               # Bounded Context: Supply Chain
│   │   ├── supply-chain.module.ts
│   │   ├── domain/
│   │   │   └── entities/
│   │   │       ├── supplier.entity.ts
│   │   │       ├── purchase-order.entity.ts
│   │   │       └── goods-receipt.entity.ts
│   │   └── ...
│   │
│   ├── finance/                    # Bounded Context: Finance
│   │   ├── finance.module.ts
│   │   ├── domain/
│   │   │   └── entities/
│   │   │       ├── expense.entity.ts
│   │   │       ├── journal-entry.entity.ts
│   │   │       ├── account.entity.ts
│   │   │       └── partner-capital.entity.ts
│   │   └── ...
│   │
│   ├── hr/                         # Bounded Context: Human Resources
│   │   ├── hr.module.ts
│   │   ├── domain/
│   │   │   └── entities/
│   │   │       ├── employee.entity.ts
│   │   │       ├── shift.entity.ts
│   │   │       └── payroll.entity.ts
│   │   └── ...
│   │
│   └── reporting/                  # Bounded Context: Reports & Analytics
│       ├── reporting.module.ts
│       └── services/
│           ├── sales-report.service.ts
│           ├── inventory-report.service.ts
│           └── financial-report.service.ts
│
├── shared/                         # Shared kernel
│   ├── shared.module.ts
│   ├── events/
│   │   └── event-bus.service.ts
│   ├── utils/
│   │   ├── date.utils.ts
│   │   └── money.utils.ts
│   └── constants/
│       └── app.constants.ts
│
└── config/
    ├── app.config.ts
    ├── database.config.ts
    ├── auth.config.ts
    └── validation.schema.ts
```

### Base Entity Pattern
```typescript
// src/core/database/base.entity.ts
@Entity()
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @Column({ name: 'created_by', nullable: true })
  createdBy?: string;

  @Column({ name: 'updated_by', nullable: true })
  updatedBy?: string;
}
```

### Proper Entity Relationships
```typescript
// Product with proper relations
@Entity('products')
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Category, category => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToMany(() => Supplier)
  @JoinTable({
    name: 'product_suppliers',
    joinColumn: { name: 'product_id' },
    inverseJoinColumn: { name: 'supplier_id' }
  })
  suppliers: Supplier[];

  @OneToMany(() => SaleItem, item => item.product)
  saleItems: SaleItem[];

  @Index()
  @Column({ unique: true })
  sku: string;
}
```

---

## Required Packages

### Authentication & Security
```bash
npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt
npm install -D @types/passport-jwt @types/bcrypt

# Rate limiting
npm install @nestjs/throttler

# Helmet for security headers
npm install helmet
```

### CQRS & Event-Driven (for ERP scale)
```bash
npm install @nestjs/cqrs

# Event sourcing (optional, for audit trail)
npm install @nestjs/event-emitter
```

### Caching & Performance
```bash
npm install @nestjs/cache-manager cache-manager

# Redis (recommended for production)
npm install cache-manager-redis-yet redis
```

### Logging & Monitoring
```bash
# Structured logging
npm install nestjs-pino pino pino-pretty

# Or Winston
npm install nest-winston winston
```

### API Features
```bash
# Pagination & Filtering
npm install nestjs-paginate

# Or build custom with
npm install typeorm-transactional-cls-hooked
```

### Testing
```bash
npm install -D @faker-js/faker testcontainers
```

### Documentation
```bash
# Already have @nestjs/swagger
# Add for better OpenAPI generation
npm install @anatine/zod-nestjs zod
```

### Utilities
```bash
# Date handling
npm install dayjs

# Money calculations (avoid floating point issues)
npm install dinero.js
npm install -D @types/dinero.js

# UUID validation
npm install uuid
npm install -D @types/uuid

# Environment validation (already have joi)
```

### Queue Processing (for async operations)
```bash
npm install @nestjs/bull bull
npm install -D @types/bull

# Or the newer BullMQ
npm install @nestjs/bullmq bullmq
```

### File Storage (for receipts, reports)
```bash
npm install @nestjs/serve-static
npm install multer
npm install -D @types/multer
```

### Complete Package.json Dependencies
```json
{
  "dependencies": {
    "@nestjs/common": "^11.0.1",
    "@nestjs/config": "^4.0.2",
    "@nestjs/core": "^11.0.1",
    "@nestjs/cqrs": "^11.0.0",
    "@nestjs/event-emitter": "^3.0.0",
    "@nestjs/jwt": "^11.0.0",
    "@nestjs/passport": "^11.0.0",
    "@nestjs/platform-express": "^11.0.1",
    "@nestjs/swagger": "^11.2.3",
    "@nestjs/throttler": "^6.0.0",
    "@nestjs/typeorm": "^11.0.0",
    "@nestjs/cache-manager": "^3.0.0",
    "@nestjs/bull": "^11.0.0",
    "bcrypt": "^5.1.1",
    "bull": "^4.12.0",
    "cache-manager": "^5.4.0",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.3",
    "dayjs": "^1.11.10",
    "dinero.js": "^1.9.1",
    "helmet": "^8.0.0",
    "joi": "^18.0.2",
    "nestjs-pino": "^4.1.0",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.1",
    "pg": "^8.16.3",
    "pino": "^9.0.0",
    "pino-pretty": "^11.0.0",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1",
    "typeorm": "^0.3.28",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "@faker-js/faker": "^9.0.0",
    "@types/bcrypt": "^5.0.2",
    "@types/bull": "^4.10.0",
    "@types/dinero.js": "^1.9.4",
    "@types/multer": "^1.4.11",
    "@types/passport-jwt": "^4.0.1",
    "@types/uuid": "^9.0.8",
    "testcontainers": "^10.7.0"
  }
}
```

---

## Implementation Roadmap

### Phase 1: Core Infrastructure
1. **Base Entity & Soft Deletes**
   - Create `BaseEntity` with audit fields
   - Migrate all entities to extend base

2. **Authentication System**
   - Implement JWT authentication
   - Add password hashing (bcrypt)
   - Create auth guards and decorators
   - Implement role-based access control

3. **Error Handling**
   - Create custom exception filters
   - Standardize API error responses
   - Add validation exception formatting

4. **Database Improvements**
   - Define proper entity relationships
   - Add database indexes
   - Setup migrations (disable auto-sync in production)

### Phase 2: Business Logic
1. **Inventory Module**
   - Product CRUD with category relations
   - Stock management with movements
   - Low stock alerts

2. **Sales Module**
   - POS transaction processing
   - Payment handling
   - Inventory deduction (transactional)
   - Receipt generation

3. **Customer Module**
   - Customer management
   - Loyalty points system
   - Purchase history

### Phase 3: Financial Features
1. **Finance Module**
   - Expense tracking
   - Partner capital management
   - Basic accounting (journal entries)

2. **Supply Chain**
   - Purchase orders
   - Goods receipts
   - Supplier management

### Phase 4: Advanced Features
1. **Reporting**
   - Sales reports (daily/weekly/monthly)
   - Inventory reports
   - Financial statements

2. **Queue Processing**
   - Email notifications
   - Report generation
   - Data exports

3. **Caching**
   - Product catalog caching
   - Session management

---

## Key Architectural Decisions

### 1. Use Repository Pattern
```typescript
// Custom repository with business methods
@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {}

  async findLowStock(threshold: number): Promise<Product[]> {
    return this.repo
      .createQueryBuilder('p')
      .where('p.stock <= :threshold', { threshold })
      .getMany();
  }
}
```

### 2. Use Transactions for Critical Operations
```typescript
@Injectable()
export class SaleService {
  async createSale(dto: CreateSaleDto): Promise<Sale> {
    return this.dataSource.transaction(async (manager) => {
      // 1. Create sale
      const sale = await manager.save(Sale, {...});

      // 2. Deduct inventory
      for (const item of dto.items) {
        await manager.decrement(Product, { id: item.productId }, 'stock', item.quantity);
      }

      // 3. Add loyalty points
      if (dto.customerId) {
        await manager.increment(Customer, { id: dto.customerId }, 'loyaltyPoints', points);
      }

      return sale;
    });
  }
}
```

### 3. Use Events for Cross-Module Communication
```typescript
// Event
export class SaleCompletedEvent {
  constructor(
    public readonly saleId: string,
    public readonly customerId: string,
    public readonly total: number,
  ) {}
}

// Publisher (Sales Module)
this.eventEmitter.emit('sale.completed', new SaleCompletedEvent(...));

// Listener (CRM Module)
@OnEvent('sale.completed')
async handleSaleCompleted(event: SaleCompletedEvent) {
  await this.loyaltyService.addPoints(event.customerId, event.total);
}
```

### 4. Standardize API Responses
```typescript
// Common response wrapper
export class ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}
```

---

## Summary

### Current State
- Well-structured OpenAPI-first approach
- Good foundation with NestJS/TypeORM
- Missing critical features for production ERP

### Priority Actions
1. Implement authentication (JWT + RBAC)
2. Fix entity relationships
3. Add transaction management
4. Implement proper error handling
5. Add database migrations

### Recommended Stack for ERP
| Layer | Technology |
|-------|------------|
| Framework | NestJS 11 |
| ORM | TypeORM |
| Database | PostgreSQL |
| Auth | JWT + Passport |
| Caching | Redis |
| Queue | Bull/BullMQ |
| Logging | Pino |
| Validation | class-validator |
| Documentation | Swagger/OpenAPI |

The current codebase provides a good starting point but requires significant architectural improvements before it can serve as a production ERP system.
