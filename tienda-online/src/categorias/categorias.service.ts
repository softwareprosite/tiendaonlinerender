import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(@InjectRepository(Categoria) private readonly repo: Repository<Categoria>) {}

  findAll() { return this.repo.find(); }

  async findOne(id: number) {
    const c = await this.repo.findOne({ where: { idCategoria: id }, relations: ['productos'] });
    if (!c) throw new NotFoundException(`Categoría con id ${id} no encontrada`);
    return c;
  }

  create(dto: CreateCategoriaDto) { return this.repo.save(this.repo.create(dto)); }

  async update(id: number, dto: UpdateCategoriaDto) {
    const c = await this.findOne(id);
    return this.repo.save(Object.assign(c, dto));
  }

  async remove(id: number) { await this.repo.softRemove(await this.findOne(id)); }
}
