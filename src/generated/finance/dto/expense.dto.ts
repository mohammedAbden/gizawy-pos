import { IsString, IsNumber, IsEmail, IsBoolean, IsOptional, IsNotEmpty, MinLength, MaxLength, Min, Max, IsArray, IsUUID, IsEnum, IsDate } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

/**
 * Expense
 */
export class Expense {
  /**
   * id
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  id?: string;

  /**
   * description
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  /**
   * amount
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  amount?: number;

  /**
   * category
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  category?: string;

  /**
   * date
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Type(() => Date)
  date?: string;

}
