import { IsString, IsNumber, IsEmail, IsBoolean, IsOptional, IsNotEmpty, MinLength, MaxLength, Min, Max, IsArray, IsUUID, IsEnum, IsDate } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

/**
 * Partner
 */
export class Partner {
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
   * capital
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  capital?: number;

  /**
   * contact
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  contact?: string;

  /**
   * joinedDate
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Type(() => Date)
  joinedDate?: string;

}
