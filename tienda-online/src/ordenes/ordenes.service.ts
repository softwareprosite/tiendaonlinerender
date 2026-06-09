import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orden } from './orden.entity';
import { Cliente } from '../clientes/cliente.entity';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';

@Injectable()
export class OrdenesService {
  constructor(
    @InjectRepository(Orden) private readonly repo: Repository<Orden>,
    @InjectRepository(Cliente) private readonly clienteRepo: Repository<Cliente>,
  ) {}

  findAll() { return this.repo.find({ relations: ['cliente'] }); }

  async findOne(id: number) {
    const o = await this.repo.findOne({
      where: { idOrden: id },
      relations: ['cliente', 'ordenProductos', 'ordenProductos.producto'],
    });
    if (!o) throw new NotFoundException(`Orden con id ${id} no encontrada`);
    return o;
  }

  async create(dto: CreateOrdenDto) {
    const c = await this.clienteRepo.findOne({ where: { idCliente: dto.idCliente } });
    if (!c) throw new NotFoundException(`Cliente con id ${dto.idCliente} no encontrado`);
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: UpdateOrdenDto) {
    const o = await this.findOne(id);
    return this.repo.save(Object.assign(o, dto));
  }

  async remove(id: number) { await this.repo.softRemove(await this.findOne(id)); }
}
