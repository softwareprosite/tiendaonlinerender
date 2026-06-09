import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(@InjectRepository(Cliente) private readonly repo: Repository<Cliente>) {}

  findAll() { return this.repo.find(); }

  async findOne(id: number) {
    const c = await this.repo.findOne({ where: { idCliente: id }, relations: ['ordenes'] });
    if (!c) throw new NotFoundException(`Cliente con id ${id} no encontrado`);
    return c;
  }

  create(dto: CreateClienteDto) { return this.repo.save(this.repo.create(dto)); }

  async update(id: number, dto: UpdateClienteDto) {
    const c = await this.findOne(id);
    return this.repo.save(Object.assign(c, dto));
  }

  async remove(id: number) { await this.repo.softRemove(await this.findOne(id)); }
}
