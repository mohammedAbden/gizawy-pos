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
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  id: string;

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
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  contact: string;

  /**
   * joinedDate - Date of joining
   */
  @ApiProperty({ description: 'Date of joining' })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  joinedDate: Date;

}
