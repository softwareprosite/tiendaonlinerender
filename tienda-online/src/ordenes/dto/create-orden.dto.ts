import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrdenDto {
  @ApiProperty({ example: 1 })                   @IsNumber() @IsPositive() @Type(() => Number) idCliente: number;
  @ApiPropertyOptional({ example: 'pendiente' }) @IsString() @IsOptional() estado?: string;
}
