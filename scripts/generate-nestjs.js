'use strict';

process.on('uncaughtException', (error) => {
  console.error('❌ FATAL ERROR:', error.message);
  console.error(error.stack);
  process.exit(1);
});

console.log('🚀 NestJS Complete Modular Generator (Simplified) Starting...\n');

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Load OpenAPI spec
const specPath = path.join(__dirname, '../openapi/api-spec.yaml');
const spec = yaml.load(fs.readFileSync(specPath, 'utf8'));

console.log('✅ OpenAPI spec loaded');
console.log(`📊 Found ${Object.keys(spec.paths || {}).length} paths`);
console.log(`📊 Found ${Object.keys(spec.components?.schemas || {}).length} schemas\n`);

// Helper functions
function toPascalCase(str) {
  return str.split(/[-_]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
}

function toCamelCase(str) {
  const p = toPascalCase(str);
  return p.charAt(0).toLowerCase() + p.slice(1);
}

function toKebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function toSnakeCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}

function getTypeScriptType(schema) {
  if (!schema) return 'any';
  if (schema.$ref) return schema.$ref.split('/').pop();
  if (schema.type === 'array') {
    if (schema.items?.$ref) {
      return `${schema.items.$ref.split('/').pop()}[]`;
    }
    return `${getTypeScriptType(schema.items)}[]`;
  }
  const map = { 
    string: 'string', 
    number: 'number', 
    integer: 'number', 
    boolean: 'boolean',
    object: 'any'
  };
  return map[schema.type] || 'any';
}

function getTypeORMType(schema) {
  if (!schema) return 'varchar';
  
  if (schema.type === 'string') {
    if (schema.format === 'uuid') return 'uuid';
    if (schema.format === 'date-time') return 'timestamp';
    if (schema.format === 'date') return 'date';
    if (schema.format === 'email') return 'varchar';
    return 'varchar';
  }
  
  if (schema.type === 'integer') return 'int';
  if (schema.type === 'number') return 'decimal';
  if (schema.type === 'boolean') return 'boolean';
  
  return 'varchar';
}

function getValidationDecorators(propSchema, isRequired) {
  const decorators = [];
  
  if (!propSchema) return decorators;
  
  if (isRequired) {
    decorators.push('@IsNotEmpty()');
  } else {
    decorators.push('@IsOptional()');
  }
  
  if (propSchema.type === 'string') {
    decorators.push('@IsString()');
    if (propSchema.format === 'email') decorators.push('@IsEmail()');
    if (propSchema.format === 'uuid') decorators.push('@IsUUID()');
    if (propSchema.minLength) decorators.push(`@MinLength(${propSchema.minLength})`);
    if (propSchema.maxLength) decorators.push(`@MaxLength(${propSchema.maxLength})`);
    if (propSchema.enum) {
      decorators.push(`@IsEnum([${propSchema.enum.map(v => `'${v}'`).join(', ')}])`);
    }
  }
  
  if (propSchema.type === 'integer' || propSchema.type === 'number') {
    decorators.push('@IsNumber()');
    if (propSchema.minimum !== undefined) decorators.push(`@Min(${propSchema.minimum})`);
    if (propSchema.maximum !== undefined) decorators.push(`@Max(${propSchema.maximum})`);
  }
  
  if (propSchema.type === 'boolean') {
    decorators.push('@IsBoolean()');
  }
  
  if (propSchema.type === 'array') {
    decorators.push('@IsArray()');
  }
  
  return decorators;
}

// Extract tag/resource name from path
function extractTagFromPath(pathUrl) {
  const parts = pathUrl.split('/').filter(Boolean);
  if (parts.length === 0) return 'default';
  return parts[0];
}

// Map schemas to modules
function mapSchemaToModule(schemaName) {
  const lower = schemaName.toLowerCase();
  
  // Map DTOs to their respective modules
  if (lower.includes('product')) return 'products';
  if (lower.includes('sale')) return 'sales';
  if (lower.includes('customer')) return 'customers';
  if (lower.includes('supplier')) return 'suppliers';
  if (lower.includes('expense')) return 'finance';
  if (lower.includes('partner')) return 'partners';
  if (lower.includes('user')) return 'auth';
  if (lower.includes('asset')) return 'assets';
  if (lower.includes('campaign')) return 'marketing';
  
  return 'common'; // fallback
}

// Create base output directory
const outputDir = path.join(__dirname, '../src/generated');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Group endpoints by extracted tags
console.log('🔍 Grouping endpoints by resource...');

const endpointsByTag = {};

for (const [pathUrl, pathItem] of Object.entries(spec.paths || {})) {
  for (const [method, operation] of Object.entries(pathItem)) {
    if (!['get', 'post', 'put', 'patch', 'delete'].includes(method)) continue;
    
    const tag = operation.tags?.[0] || extractTagFromPath(pathUrl);
    
    if (!endpointsByTag[tag]) {
      endpointsByTag[tag] = [];
    }
    
    endpointsByTag[tag].push({
      path: pathUrl,
      method,
      operation,
      tag
    });
  }
}

Object.entries(endpointsByTag).forEach(([tag, endpoints]) => {
  console.log(`  ✅ ${tag}: ${endpoints.length} endpoint(s)`);
});
console.log();

// Generate Complete Modules
console.log('📝 Generating Complete Modules...\n');

const allModules = [];
const schemas = spec.components?.schemas || {};

for (const [tag, endpoints] of Object.entries(endpointsByTag)) {
  console.log(`📦 Processing module: "${tag}"`);
  
  const moduleFolderName = toKebabCase(tag);
  const moduleDir = path.join(outputDir, moduleFolderName);
  
  // Create module subdirectories
  const dtoDir = path.join(moduleDir, 'dto');
  const entityDir = path.join(moduleDir, 'entities');
  
  [moduleDir, dtoDir, entityDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
  
  const controllerName = toPascalCase(tag) + 'Controller';
  const serviceName = toPascalCase(tag) + 'Service';
  const serviceInstanceName = toCamelCase(tag) + 'Service';
  const moduleNameClass = toPascalCase(tag) + 'Module';
  
  const basePath = tag.toLowerCase();
  
  allModules.push({
    name: moduleNameClass,
    folderName: moduleFolderName,
    tag
  });
  
  // Collect schemas used by this module
  const moduleDtos = new Set();
  const moduleEntities = new Set();
  
  // Generate DTOs for this module
  console.log(`  📝 Generating DTOs...`);
  
  for (const [schemaName, schema] of Object.entries(schemas)) {
    const schemaModule = mapSchemaToModule(schemaName);
    
    if (schemaModule !== tag) continue;
    
    moduleDtos.add(schemaName);
    
    const isEntity = !schemaName.toLowerCase().includes('input') && 
                     !schemaName.toLowerCase().includes('dto');
    
    if (isEntity) {
      moduleEntities.add(schemaName);
    }
    
    const properties = schema.properties || {};
    const required = schema.required || [];
    
    let dtoContent = `import { IsString, IsNumber, IsEmail, IsBoolean, IsOptional, IsNotEmpty, MinLength, MaxLength, Min, Max, IsArray, IsUUID, IsEnum, IsDate } from 'class-validator';\n`;
    dtoContent += `import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';\n`;
    dtoContent += `import { Type } from 'class-transformer';\n\n`;
    dtoContent += `/**\n * ${schema.description || schemaName}\n */\n`;
    dtoContent += `export class ${schemaName} {\n`;
    
    for (const [propName, propSchema] of Object.entries(properties)) {
      const isReq = required.includes(propName);
      const tsType = getTypeScriptType(propSchema);
      const decorators = getValidationDecorators(propSchema, isReq);
      
      dtoContent += `  /**\n   * ${propSchema.description || propName}\n   */\n`;
      
      const apiPropOptions = [];
      if (propSchema.description) apiPropOptions.push(`description: '${propSchema.description}'`);
      if (propSchema.example) apiPropOptions.push(`example: ${JSON.stringify(propSchema.example)}`);
      if (propSchema.enum) apiPropOptions.push(`enum: [${propSchema.enum.map(v => `'${v}'`).join(', ')}]`);
      
      const apiPropString = apiPropOptions.length > 0 ? `{ ${apiPropOptions.join(', ')} }` : '';
      
      if (isReq) {
        dtoContent += `  @ApiProperty(${apiPropString})\n`;
      } else {
        dtoContent += `  @ApiPropertyOptional(${apiPropString})\n`;
      }
      
      decorators.forEach(dec => {
        dtoContent += `  ${dec}\n`;
      });
      
      if (propSchema.format === 'date-time' || propSchema.format === 'date') {
        dtoContent += `  @Type(() => Date)\n`;
      }
      
      dtoContent += `  ${propName}${isReq ? '' : '?'}: ${tsType};\n\n`;
    }
    
    dtoContent += '}\n';
    
    const fileName = `${toKebabCase(schemaName)}.dto.ts`;
    fs.writeFileSync(path.join(dtoDir, fileName), dtoContent);
    console.log(`    ✅ dto/${fileName}`);
  }
  
  // Generate DTO index
  if (moduleDtos.size > 0) {
    const dtoIndexContent = Array.from(moduleDtos)
      .map(dto => `export * from './${toKebabCase(dto)}.dto';`)
      .join('\n') + '\n';
    fs.writeFileSync(path.join(dtoDir, 'index.ts'), dtoIndexContent);
    console.log(`    ✅ dto/index.ts`);
  }
  
  // Generate Entities for this module
  console.log(`  🗄️  Generating Entities...`);
  
  for (const entityName of moduleEntities) {
    const schema = schemas[entityName];
    const properties = schema.properties || {};
    const required = schema.required || [];
    
    const tableName = toSnakeCase(entityName) + 's';
    
    let entityContent = `import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';\n\n`;
    entityContent += `/**\n * ${schema.description || entityName} Entity\n */\n`;
    entityContent += `@Entity('${tableName}')\n`;
    entityContent += `export class ${entityName}Entity {\n`;
    
    // Add primary key
    entityContent += `  @PrimaryGeneratedColumn('uuid')\n`;
    entityContent += `  id: string;\n\n`;
    
    for (const [propName, propSchema] of Object.entries(properties)) {
      if (propName === 'id') continue;
      
      const columnType = getTypeORMType(propSchema);
      const nullable = !required.includes(propName);
      
      entityContent += `  /**\n   * ${propSchema.description || propName}\n   */\n`;
      
      const columnOptions = [];
      columnOptions.push(`type: '${columnType}'`);
      if (nullable) columnOptions.push(`nullable: true`);
      if (propSchema.enum) {
        columnOptions.push(`enum: [${propSchema.enum.map(v => `'${v}'`).join(', ')}]`);
      }
      if (propSchema.maxLength) {
        columnOptions.push(`length: ${propSchema.maxLength}`);
      }
      if (propSchema.type === 'number' && columnType === 'decimal') {
        columnOptions.push(`precision: 10, scale: 2`);
      }
      
      entityContent += `  @Column({ ${columnOptions.join(', ')} })\n`;
      entityContent += `  ${propName}${nullable ? '?' : ''}: ${getTypeScriptType(propSchema)};\n\n`;
    }
    
    // Add timestamps
    entityContent += `  @CreateDateColumn({ name: 'created_at' })\n`;
    entityContent += `  createdAt: Date;\n\n`;
    
    entityContent += `  @UpdateDateColumn({ name: 'updated_at' })\n`;
    entityContent += `  updatedAt: Date;\n`;
    
    entityContent += '}\n';
    
    const fileName = `${toKebabCase(entityName)}.entity.ts`;
    fs.writeFileSync(path.join(entityDir, fileName), entityContent);
    console.log(`    ✅ entities/${fileName}`);
  }
  
  // Generate Entity index
  if (moduleEntities.size > 0) {
    const entityIndexContent = Array.from(moduleEntities)
      .map(entity => `export * from './${toKebabCase(entity)}.entity';`)
      .join('\n') + '\n';
    fs.writeFileSync(path.join(entityDir, 'index.ts'), entityIndexContent);
    console.log(`    ✅ entities/index.ts`);
  }
  
  // Process endpoints
  const usedDtos = new Set();
  
  const processedEndpoints = endpoints.map(({ path, method, operation }) => {
    const methodName = operation.operationId || toCamelCase(method + '-' + path.replace(/[^a-zA-Z0-9]/g, '-'));
    
    let routePath = path;
    const pathParts = path.split('/').filter(Boolean);
    if (pathParts[0] === tag) {
      routePath = '/' + pathParts.slice(1).join('/');
    }
    if (routePath === '') routePath = '/';
    
    const pathParams = (operation.parameters || [])
      .filter(p => p.in === 'path')
      .map(p => ({
        name: p.name,
        type: getTypeScriptType(p.schema),
        decorator: `@Param('${p.name}')`,
        description: p.description || '',
      }));
    
    const queryParams = (operation.parameters || [])
      .filter(p => p.in === 'query')
      .map(p => ({
        name: p.name,
        type: getTypeScriptType(p.schema),
        decorator: `@Query('${p.name}')`,
        required: p.required || false,
        description: p.description || '',
      }));
    
    let bodyParam = null;
    const requestBody = operation.requestBody;
    if (requestBody) {
      const schema = requestBody.content?.['application/json']?.schema;
      if (schema?.$ref) {
        const dtoName = schema.$ref.split('/').pop();
        if (moduleDtos.has(dtoName)) {
          usedDtos.add(dtoName);
          bodyParam = {
            name: toCamelCase(dtoName),
            type: dtoName,
            decorator: '@Body()',
          };
        }
      }
    }
    
    const responses = Object.entries(operation.responses || {}).map(([status, response]) => {
      const schema = response.content?.['application/json']?.schema;
      let type = null;
      
      if (schema?.$ref) {
        const dtoName = schema.$ref.split('/').pop();
        if (moduleDtos.has(dtoName)) {
          usedDtos.add(dtoName);
          type = dtoName;
        }
      } else if (schema?.type === 'array' && schema.items?.$ref) {
        const dtoName = schema.items.$ref.split('/').pop();
        if (moduleDtos.has(dtoName)) {
          usedDtos.add(dtoName);
          type = `${dtoName}[]`;
        }
      }
      
      return {
        status,
        description: response.description || '',
        type,
      };
    });
    
    const allParams = [...pathParams, ...queryParams];
    if (bodyParam) allParams.push(bodyParam);
    
    const returnType = responses.find(r => r.type)?.type || 'any';
    
    return {
      methodName,
      path: routePath,
      httpMethod: method.charAt(0).toUpperCase() + method.slice(1),
      summary: operation.summary || methodName,
      description: operation.description || '',
      pathParams,
      queryParams,
      bodyParam,
      allParams,
      responses,
      returnType,
      serviceParams: allParams.map(p => p.name),
    };
  });
  
  // Generate Controller
  console.log(`  🎮 Generating Controller...`);
  
  let controllerContent = `import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';\n`;
  controllerContent += `import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';\n`;
  controllerContent += `import { ${serviceName} } from './${moduleFolderName}.service';\n`;
  
  if (usedDtos.size > 0) {
    controllerContent += `import { ${Array.from(usedDtos).join(', ')} } from './dto';\n`;
  }
  
  controllerContent += `\n/**\n * Controller for ${tag} endpoints\n */\n`;
  controllerContent += `@ApiTags('${tag}')\n`;
  controllerContent += `@Controller('${basePath}')\n`;
  controllerContent += `export class ${controllerName} {\n`;
  controllerContent += `  constructor(private readonly ${serviceInstanceName}: ${serviceName}) {}\n\n`;
  
  processedEndpoints.forEach(endpoint => {
    controllerContent += `  /**\n   * ${endpoint.summary}\n   */\n`;
    controllerContent += `  @${endpoint.httpMethod}('${endpoint.path}')\n`;
    
    if (endpoint.httpMethod === 'Delete') {
      controllerContent += `  @HttpCode(HttpStatus.NO_CONTENT)\n`;
    }
    
    controllerContent += `  @ApiOperation({ summary: '${endpoint.summary}' })\n`;
    
    endpoint.responses.forEach(response => {
      controllerContent += `  @ApiResponse({ status: ${response.status}, description: '${response.description}'`;
      if (response.type) {
        if (response.type.endsWith('[]')) {
          const baseType = response.type.replace('[]', '');
          controllerContent += `, type: [${baseType}]`;
        } else {
          controllerContent += `, type: ${response.type}`;
        }
      }
      controllerContent += ` })\n`;
    });
    
    endpoint.pathParams.forEach(param => {
      controllerContent += `  @ApiParam({ name: '${param.name}', description: '${param.description}' })\n`;
    });
    
    endpoint.queryParams.forEach(param => {
      controllerContent += `  @ApiQuery({ name: '${param.name}', required: ${param.required}, description: '${param.description}' })\n`;
    });
    
    const params = endpoint.allParams.map(p => {
      const optional = p.decorator.includes('Query') && !p.required ? '?' : '';
      return `${p.decorator} ${p.name}${optional}: ${p.type}`;
    }).join(', ');
    
    controllerContent += `  async ${endpoint.methodName}(${params}): Promise<${endpoint.returnType}> {\n`;
    controllerContent += `    return this.${serviceInstanceName}.${endpoint.methodName}(${endpoint.serviceParams.join(', ')});\n`;
    controllerContent += `  }\n\n`;
  });
  
  controllerContent += '}\n';
  
  const controllerFileName = `${moduleFolderName}.controller.ts`;
  fs.writeFileSync(path.join(moduleDir, controllerFileName), controllerContent);
  console.log(`    ✅ ${controllerFileName}`);
  
  // Generate Service (WITHOUT custom repository - inject TypeORM repository directly)
  console.log(`  ⚙️  Generating Service...`);
  
  let serviceContent = `import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';\n`;
  
  if (moduleEntities.size > 0) {
    serviceContent += `import { InjectRepository } from '@nestjs/typeorm';\n`;
    serviceContent += `import { Repository } from 'typeorm';\n`;
    const entityImports = Array.from(moduleEntities).map(e => `${e}Entity`).join(', ');
    serviceContent += `import { ${entityImports} } from './entities';\n`;
  }
  
  if (usedDtos.size > 0) {
    serviceContent += `import { ${Array.from(usedDtos).join(', ')} } from './dto';\n`;
  }
  
  serviceContent += `\n/**\n * Service for ${tag} business logic\n */\n`;
  serviceContent += `@Injectable()\n`;
  serviceContent += `export class ${serviceName} {\n`;
  
  if (moduleEntities.size > 0) {
    const primaryEntity = Array.from(moduleEntities)[0];
    serviceContent += `  constructor(\n`;
    serviceContent += `    @InjectRepository(${primaryEntity}Entity)\n`;
    serviceContent += `    private readonly repository: Repository<${primaryEntity}Entity>,\n`;
    serviceContent += `  ) {}\n\n`;
  }
  
  processedEndpoints.forEach(endpoint => {
    const params = endpoint.allParams.map(p => {
      const optional = p.decorator && p.decorator.includes('Query') ? '?' : '';
      return `${p.name}${optional}: ${p.type}`;
    }).join(', ');
    
    serviceContent += `  /**\n   * ${endpoint.summary}\n   */\n`;
    serviceContent += `  async ${endpoint.methodName}(${params}): Promise<${endpoint.returnType}> {\n`;
    serviceContent += `    // TODO: Implement ${endpoint.methodName}\n`;
    
    if (moduleEntities.size > 0) {
      serviceContent += `    // Example using repository:\n`;
      serviceContent += `    // return this.repository.find();\n`;
      serviceContent += `    // return this.repository.findOne({ where: { id } });\n`;
      serviceContent += `    // return this.repository.save(data);\n`;
    }
    
    serviceContent += `    throw new Error('Method ${endpoint.methodName} not implemented');\n`;
    serviceContent += `  }\n\n`;
  });
  
  serviceContent += '}\n';
  
  const serviceFileName = `${moduleFolderName}.service.ts`;
  fs.writeFileSync(path.join(moduleDir, serviceFileName), serviceContent);
  console.log(`    ✅ ${serviceFileName}`);
  
  // Generate Module
  console.log(`  📦 Generating Module...`);
  
  let moduleContent = `import { Module } from '@nestjs/common';\n`;
  
  if (moduleEntities.size > 0) {
    moduleContent += `import { TypeOrmModule } from '@nestjs/typeorm';\n`;
  }
  
  moduleContent += `import { ${controllerName} } from './${controllerFileName.replace('.ts', '')}';\n`;
  moduleContent += `import { ${serviceName} } from './${serviceFileName.replace('.ts', '')}';\n`;
  
  if (moduleEntities.size > 0) {
    const entityImports = Array.from(moduleEntities).map(e => `${e}Entity`).join(', ');
    moduleContent += `import { ${entityImports} } from './entities';\n`;
  }
  
  moduleContent += `\n/**\n * ${toPascalCase(tag)} Module\n */\n`;
  moduleContent += `@Module({\n`;
  
  if (moduleEntities.size > 0) {
    const entityImports = Array.from(moduleEntities).map(e => `${e}Entity`).join(', ');
    moduleContent += `  imports: [TypeOrmModule.forFeature([${entityImports}])],\n`;
  }
  
  moduleContent += `  controllers: [${controllerName}],\n`;
  moduleContent += `  providers: [${serviceName}],\n`;
  moduleContent += `  exports: [${serviceName}],\n`;
  moduleContent += `})\n`;
  moduleContent += `export class ${moduleNameClass} {}\n`;
  
  const moduleFileName = `${moduleFolderName}.module.ts`;
  fs.writeFileSync(path.join(moduleDir, moduleFileName), moduleContent);
  console.log(`    ✅ ${moduleFileName}\n`);
}

// Generate Main App Module
console.log('📝 Generating main app module...');

let appModuleContent = `import { Module } from '@nestjs/common';\n`;
appModuleContent += `import { TypeOrmModule } from '@nestjs/typeorm';\n`;

allModules.forEach(mod => {
  appModuleContent += `import { ${mod.name} } from './${mod.folderName}/${mod.folderName}.module';\n`;
});

appModuleContent += `\n/**\n * Main generated API module\n * Generated from: OmniStore POS API\n */\n`;
appModuleContent += `@Module({\n`;
appModuleContent += `  imports: [\n`;
appModuleContent += `    // Database configuration\n`;
appModuleContent += `    // Uncomment and configure for your database\n`;
appModuleContent += `    TypeOrmModule.forRoot({\n`;
appModuleContent += `      type: 'postgres', // or 'mysql'\n`;
appModuleContent += `      host: process.env.DB_HOST || 'localhost',\n`;
appModuleContent += `      port: parseInt(process.env.DB_PORT) || 5432,\n`;
appModuleContent += `      username: process.env.DB_USERNAME || 'postgres',\n`;
appModuleContent += `      password: process.env.DB_PASSWORD || 'password',\n`;
appModuleContent += `      database: process.env.DB_DATABASE || 'omnistore',\n`;
appModuleContent += `      entities: [__dirname + '/**/*.entity{.ts,.js}'],\n`;
appModuleContent += `      synchronize: process.env.NODE_ENV !== 'production',\n`;
appModuleContent += `    }),\n\n`;
appModuleContent += `    // Feature modules\n`;
allModules.forEach((mod, idx) => {
  appModuleContent += `    ${mod.name}${idx < allModules.length - 1 ? ',' : ''}\n`;
});
appModuleContent += `  ],\n`;
appModuleContent += `})\n`;
appModuleContent += `export class GeneratedApiModule {}\n`;

fs.writeFileSync(path.join(outputDir, 'generated-api.module.ts'), appModuleContent);
console.log(`  ✅ generated-api.module.ts\n`);

// Generate database configuration file
console.log('📝 Generating database config...');

let dbConfigContent = `import { TypeOrmModuleOptions } from '@nestjs/typeorm';\n\n`;
dbConfigContent += `export const databaseConfig: TypeOrmModuleOptions = {\n`;
dbConfigContent += `  type: 'postgres', // Change to 'mysql' if using MySQL\n`;
dbConfigContent += `  host: process.env.DB_HOST || 'localhost',\n`;
dbConfigContent += `  port: parseInt(process.env.DB_PORT) || 5432, // 3306 for MySQL\n`;
dbConfigContent += `  username: process.env.DB_USERNAME || 'postgres',\n`;
dbConfigContent += `  password: process.env.DB_PASSWORD || 'password',\n`;
dbConfigContent += `  database: process.env.DB_DATABASE || 'omnistore',\n`;
dbConfigContent += `  entities: [__dirname + '/**/*.entity{.ts,.js}'],\n`;
dbConfigContent += `  synchronize: process.env.NODE_ENV !== 'production',\n`;
dbConfigContent += `  logging: process.env.NODE_ENV === 'development',\n`;
dbConfigContent += `};\n`;

fs.writeFileSync(path.join(outputDir, 'database.config.ts'), dbConfigContent);
console.log(`  ✅ database.config.ts\n`);

// Generate index.ts
console.log('📝 Generating index files...');

let mainIndexContent = `export * from './generated-api.module';\n`;
mainIndexContent += `export * from './database.config';\n`;
allModules.forEach(mod => {
  mainIndexContent += `export * from './${mod.folderName}/${mod.folderName}.module';\n`;
});
fs.writeFileSync(path.join(outputDir, 'index.ts'), mainIndexContent);
console.log(`  ✅ index.ts\n`);

// Summary
console.log('✨ Generation Complete!\n');
console.log('📊 Summary:');
console.log(`  - ${allModules.length} Feature Modules`);
console.log(`  - ${allModules.length} Controllers`);
console.log(`  - ${allModules.length} Services (with direct TypeORM repository injection)`);
console.log(`  - DTOs per module`);
console.log(`  - Entities per module`);
console.log(`  - NO custom repository classes (simplified)`);
console.log(`  - 1 Main Module`);
console.log(`  - Database Configuration\n`);

console.log('📝 Next steps:');
console.log('1. Configure .env file with database credentials');
console.log('2. Import GeneratedApiModule in your app.module.ts');
console.log('3. Implement service methods using this.repository');
console.log('4. Run: npm run start:dev\n');