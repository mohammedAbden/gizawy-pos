import { IsString, IsNumber, IsEmail, IsBoolean, IsOptional, IsNotEmpty, MinLength, MaxLength, Min, Max, IsArray, IsUUID, IsEnum, IsDate } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

/**
 * PartnerTransaction
 */
export class PartnerTransaction {
  /**
   * id
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  id?: string;

  /**
   * partnerId
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  partnerId?: string;

  /**
   * amount
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  amount?: number;

  /**
   * type
   */
  @ApiPropertyOptional({ enum: ['DEPOSIT', 'WITHDRAWAL'] })
  @IsOptional()
  @IsString()
  @IsEnum(['DEPOSIT', 'WITHDRAWAL'])
  type?: string;

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
