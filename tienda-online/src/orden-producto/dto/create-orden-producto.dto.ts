import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrdenProductoDto {
  @ApiProperty({ example: 1 })     @IsNumber() @IsPositive() @Type(() => Number) idOrden: number;
  @ApiProperty({ example: 1 })     @IsNumber() @IsPositive() @Type(() => Number) idProducto: number;
  @ApiProperty({ example: 2 })     @IsNumber() @Min(1)        @Type(() => Number) cantidad: number;
  @ApiProperty({ example: 99.99 }) @IsNumber() @IsPositive() @Type(() => Number) precio_unitario: number;
}
