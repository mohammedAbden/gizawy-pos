import { IsString, IsNumber, IsEmail, IsBoolean, IsOptional, IsNotEmpty, MinLength, MaxLength, Min, Max, IsArray, IsUUID, IsEnum, IsDate } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

/**
 * PartnerInput
 */
export class PartnerInput {
  /**
   * name
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  /**
   * capital
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  capital: number;

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
  joinedDate?: string;

}
