import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './producto.entity';
import { Categoria } from '../categorias/categoria.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto) private readonly repo: Repository<Producto>,
    @InjectRepository(Categoria) private readonly catRepo: Repository<Categoria>,
  ) {}

  findAll() { return this.repo.find({ relations: ['categoria'] }); }

  async findOne(id: number) {
    const p = await this.repo.findOne({ where: { idProducto: id }, relations: ['categoria'] });
    if (!p) throw new NotFoundException(`Producto con id ${id} no encontrado`);
    return p;
  }

  async create(dto: CreateProductoDto) {
    const cat = await this.catRepo.findOne({ where: { idCategoria: dto.idCategoria } });
    if (!cat) throw new NotFoundException(`Categoría con id ${dto.idCategoria} no encontrada`);
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: UpdateProductoDto) {
    const p = await this.findOne(id);
    if (dto.idCategoria) {
      const cat = await this.catRepo.findOne({ where: { idCategoria: dto.idCategoria } });
      if (!cat) throw new NotFoundException(`Categoría con id ${dto.idCategoria} no encontrada`);
    }
    return this.repo.save(Object.assign(p, dto));
  }

  async remove(id: number) { await this.repo.softRemove(await this.findOne(id)); }
}
