import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Producto } from '../productos/producto.entity';

@Entity('categorias')
export class Categoria {
  @ApiProperty() @PrimaryGeneratedColumn() idCategoria: number;
  @ApiProperty() @Column() nombre: string;
  @ApiProperty() @Column({ nullable: true }) descripcion: string;
  @ApiProperty() @CreateDateColumn() creadoEn: Date;
  @ApiProperty() @UpdateDateColumn() actualizadoEn: Date;
  @ApiProperty() @DeleteDateColumn() eliminadoEn: Date;
  @OneToMany(() => Producto, (p) => p.categoria) productos: Producto[];
}
