import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdenesController } from './ordenes.controller';
import { OrdenesService } from './ordenes.service';
import { Orden } from './orden.entity';
import { Cliente } from '../clientes/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orden, Cliente])],
  controllers: [OrdenesController],
  providers: [OrdenesService],
  exports: [TypeOrmModule],
})
export class OrdenesModule {}
