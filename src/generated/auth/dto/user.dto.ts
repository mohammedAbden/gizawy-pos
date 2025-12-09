import { IsString, IsNumber, IsEmail, IsBoolean, IsOptional, IsNotEmpty, MinLength, MaxLength, Min, Max, IsArray, IsUUID, IsEnum, IsDate } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

/**
 * User
 */
export class User {
  /**
   * id
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  id?: string;

  /**
   * name
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  /**
   * role
   */
  @ApiPropertyOptional({ enum: ['ADMIN', 'CASHIER', 'MANAGER'] })
  @IsOptional()
  @IsString()
  @IsEnum(['ADMIN', 'CASHIER', 'MANAGER'])
  role?: string;

}
