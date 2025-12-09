import { IsString, IsNumber, IsEmail, IsBoolean, IsOptional, IsNotEmpty, MinLength, MaxLength, Min, Max, IsArray, IsUUID, IsEnum, IsDate } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

/**
 * Campaign
 */
export class Campaign {
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
   * content
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  content?: string;

  /**
   * status
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  status?: string;

}
