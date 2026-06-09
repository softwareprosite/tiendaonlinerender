import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Orden } from '../ordenes/orden.entity';

@Entity('clientes')
export class Cliente {
  @ApiProperty() @PrimaryGeneratedColumn() idCliente: number;
  @ApiProperty() @Column() nombres: string;
  @ApiProperty() @Column() paterno: string;
  @ApiProperty() @Column() materno: string;
  @ApiProperty() @Column({ unique: true }) email: string;
  @ApiProperty() @CreateDateColumn() creadoEn: Date;
  @ApiProperty() @UpdateDateColumn() actualizadoEn: Date;
  @ApiProperty() @DeleteDateColumn() eliminadoEn: Date;
  @OneToMany(() => Orden, (o) => o.cliente) ordenes: Orden[];
}
