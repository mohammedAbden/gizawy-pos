import { IsString, IsNumber, IsEmail, IsBoolean, IsOptional, IsNotEmpty, MinLength, MaxLength, Min, Max, IsArray, IsUUID, IsEnum, IsDate } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

/**
 * PartnerTransactionInput
 */
export class PartnerTransactionInput {
  /**
   * amount
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  /**
   * type
   */
  @ApiProperty({ enum: ['DEPOSIT', 'WITHDRAWAL'] })
  @IsNotEmpty()
  @IsString()
  @IsEnum(['DEPOSIT', 'WITHDRAWAL'])
  type: string;

  /**
   * date
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  date?: string;

  /**
   * proofImage
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  proofImage?: string;

  /**
   * notes
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;

}
