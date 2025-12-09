import { IsString, IsNumber, IsEmail, IsBoolean, IsOptional, IsNotEmpty, MinLength, MaxLength, Min, Max, IsArray, IsUUID, IsEnum, IsDate } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

/**
 * CustomerInput
 */
export class CustomerInput {
  /**
   * name
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  /**
   * email
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  email?: string;

  /**
   * phone
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;

}
