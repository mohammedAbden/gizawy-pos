import { IsString, IsNumber, IsEmail, IsBoolean, IsOptional, IsNotEmpty, MinLength, MaxLength, Min, Max, IsArray, IsUUID, IsEnum, IsDate } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

/**
 * UserInput
 */
export class UserInput {
  /**
   * name
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  /**
   * role
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  role: string;

  /**
   * pin
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  pin: string;

}
