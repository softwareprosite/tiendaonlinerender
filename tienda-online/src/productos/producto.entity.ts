import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, DeleteDateColumn,
  ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Categoria } from '../categorias/categoria.entity';
import { OrdenProducto } from '../orden-producto/orden-producto.entity';

@Entity('productos')
export class Producto {
  @ApiProperty() @PrimaryGeneratedColumn() idProducto: number;
  @ApiProperty() @Column() idCategoria: number;
  @ApiProperty() @Column() nombre: string;
  @ApiProperty() @Column({ nullable: true }) descripcion: string;
  @ApiProperty() @Column({ type: 'decimal', precision: 10, scale: 2 }) precio: number;
  @ApiProperty() @Column({ default: 0 }) stock: number;
  @ApiProperty() @CreateDateColumn() creadoEn: Date;
  @ApiProperty() @UpdateDateColumn() actualizadoEn: Date;
  @ApiProperty() @DeleteDateColumn() eliminadoEn: Date;

  @ManyToOne(() => Categoria, (c) => c.productos)
  @JoinColumn({ name: 'idCategoria' })
  categoria: Categoria;

  @OneToMany(() => OrdenProducto, (op) => op.producto)
  ordenProductos: OrdenProducto[];
}
