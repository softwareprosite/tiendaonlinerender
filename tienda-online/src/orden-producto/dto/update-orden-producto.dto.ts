import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateOrdenProductoDto {
  @ApiPropertyOptional({ example: 3 })    @IsNumber() @Min(1)        @IsOptional() @Type(() => Number) cantidad?: number;
  @ApiPropertyOptional({ example: 89.99 }) @IsNumber() @IsPositive() @IsOptional() @Type(() => Number) precio_unitario?: number;
}
