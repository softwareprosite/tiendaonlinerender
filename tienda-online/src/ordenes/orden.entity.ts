import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, DeleteDateColumn,
  ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Cliente } from '../clientes/cliente.entity';
import { OrdenProducto } from '../orden-producto/orden-producto.entity';

@Entity('ordenes')
export class Orden {
  @ApiProperty() @PrimaryGeneratedColumn() idOrden: number;
  @ApiProperty() @Column() idCliente: number;
  @ApiProperty() @Column({ default: 'pendiente' }) estado: string;
  @ApiProperty() @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 }) total: number;
  @ApiProperty() @CreateDateColumn() creadoEn: Date;
  @ApiProperty() @UpdateDateColumn() actualizadoEn: Date;
  @ApiProperty() @DeleteDateColumn() eliminadoEn: Date;

  @ManyToOne(() => Cliente, (c) => c.ordenes)
  @JoinColumn({ name: 'idCliente' })
  cliente: Cliente;

  @OneToMany(() => OrdenProducto, (op) => op.orden)
  ordenProductos: OrdenProducto[];
}
