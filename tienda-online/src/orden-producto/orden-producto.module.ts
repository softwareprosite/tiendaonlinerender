import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdenProductoController } from './orden-producto.controller';
import { OrdenProductoService } from './orden-producto.service';
import { OrdenProducto } from './orden-producto.entity';
import { Orden } from '../ordenes/orden.entity';
import { Producto } from '../productos/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrdenProducto, Orden, Producto])],
  controllers: [OrdenProductoController],
  providers: [OrdenProductoService],
  exports: [TypeOrmModule],
})
export class OrdenProductoModule {}
