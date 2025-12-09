import { IsString, IsNumber, IsEmail, IsBoolean, IsOptional, IsNotEmpty, MinLength, MaxLength, Min, Max, IsArray, IsUUID, IsEnum, IsDate } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

/**
 * ExpenseInput
 */
export class ExpenseInput {
  /**
   * description
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  /**
   * amount
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

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
