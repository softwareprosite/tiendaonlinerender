import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductoDto {
  @ApiProperty({ example: 1 })           @IsNumber() @IsPositive() @Type(() => Number) idCategoria: number;
  @ApiProperty({ example: 'Laptop HP' }) @IsString() @IsNotEmpty() nombre: string;
  @ApiPropertyOptional({ example: '8GB RAM' }) @IsString() @IsOptional() descripcion?: string;
  @ApiProperty({ example: 599.99 })      @IsNumber() @IsPositive() @Type(() => Number) precio: number;
  @ApiProperty({ example: 50 })          @IsNumber() @Min(0)        @Type(() => Number) stock: number;
}
