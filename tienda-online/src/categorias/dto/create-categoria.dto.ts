import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoriaDto {
  @ApiProperty({ example: 'Electrónica' }) @IsString() @IsNotEmpty() nombre: string;
  @ApiPropertyOptional({ example: 'Gadgets y dispositivos' }) @IsString() @IsOptional() descripcion?: string;
}
