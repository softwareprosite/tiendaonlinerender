import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdenProducto } from './orden-producto.entity';
import { Orden } from '../ordenes/orden.entity';
import { Producto } from '../productos/producto.entity';
import { CreateOrdenProductoDto } from './dto/create-orden-producto.dto';
import { UpdateOrdenProductoDto } from './dto/update-orden-producto.dto';

@Injectable()
export class OrdenProductoService {
  constructor(
    @InjectRepository(OrdenProducto) private readonly repo: Repository<OrdenProducto>,
    @InjectRepository(Orden)         private readonly ordenRepo: Repository<Orden>,
    @InjectRepository(Producto)      private readonly productoRepo: Repository<Producto>,
  ) {}

  findAll() { return this.repo.find({ relations: ['orden', 'producto'] }); }

  async findOne(id: number) {
    const op = await this.repo.findOne({ where: { idOrdenProducto: id }, relations: ['orden', 'producto'] });
    if (!op) throw new NotFoundException(`OrdenProducto con id ${id} no encontrado`);
    return op;
  }

  async create(dto: CreateOrdenProductoDto) {
    const orden = await this.ordenRepo.findOne({ where: { idOrden: dto.idOrden } });
    if (!orden) throw new NotFoundException(`Orden con id ${dto.idOrden} no encontrada`);
    const producto = await this.productoRepo.findOne({ where: { idProducto: dto.idProducto } });
    if (!producto) throw new NotFoundException(`Producto con id ${dto.idProducto} no encontrado`);
    const op = await this.repo.save(this.repo.create(dto));
    await this.recalcularTotal(dto.idOrden);
    return op;
  }

  async update(id: number, dto: UpdateOrdenProductoDto) {
    const op = await this.findOne(id);
    Object.assign(op, dto);
    const saved = await this.repo.save(op);
    await this.recalcularTotal(op.idOrden);
    return saved;
  }

  async removeProductoDeOrden(idOrden: number, idProducto: number) {
    const op = await this.repo.findOne({ where: { idOrden, idProducto } });
    if (!op) throw new NotFoundException(`Producto ${idProducto} no está en la orden ${idOrden}`);
    await this.repo.softRemove(op);
    await this.recalcularTotal(idOrden);
  }

  private async recalcularTotal(idOrden: number) {
    const items = await this.repo.find({ where: { idOrden } });
    const total = items.reduce((s, i) => s + Number(i.precio_unitario) * i.cantidad, 0);
    await this.ordenRepo.update({ idOrden }, { total });
  }
}
