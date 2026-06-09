import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty({ example: 'Juan Carlos' }) @IsString() @IsNotEmpty() nombres: string;
  @ApiProperty({ example: 'García' })      @IsString() @IsNotEmpty() paterno: string;
  @ApiProperty({ example: 'López' })       @IsString() @IsNotEmpty() materno: string;
  @ApiProperty({ example: 'juan@email.com' }) @IsEmail() @IsNotEmpty() email: string;
}
