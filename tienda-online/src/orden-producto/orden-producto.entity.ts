import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, DeleteDateColumn,
  ManyToOne, JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Orden } from '../ordenes/orden.entity';
import { Producto } from '../productos/producto.entity';

@Entity('orden_producto')
export class OrdenProducto {
  @ApiProperty() @PrimaryGeneratedColumn() idOrdenProducto: number;
  @ApiProperty() @Column() idProducto: number;
  @ApiProperty() @Column() idOrden: number;
  @ApiProperty() @Column() cantidad: number;
  @ApiProperty() @Column({ type: 'decimal', precision: 10, scale: 2 }) precio_unitario: number;
  @ApiProperty() @CreateDateColumn() creadoEn: Date;
  @ApiProperty() @UpdateDateColumn() actualizadoEn: Date;
  @ApiProperty() @DeleteDateColumn() eliminadoEn: Date;

  @ManyToOne(() => Orden, (o) => o.ordenProductos)
  @JoinColumn({ name: 'idOrden' })
  orden: Orden;

  @ManyToOne(() => Producto, (p) => p.ordenProductos)
  @JoinColumn({ name: 'idProducto' })
  producto: Producto;
}
