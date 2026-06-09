import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateOrdenDto {
  @ApiPropertyOptional({ example: 'completada' }) @IsString()  @IsOptional() estado?: string;
  @ApiPropertyOptional({ example: 150.00 })       @IsNumber() @IsOptional() @Type(() => Number) total?: number;
}
