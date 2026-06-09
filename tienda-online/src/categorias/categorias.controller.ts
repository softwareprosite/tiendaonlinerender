import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@ApiTags('Categorias')
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly svc: CategoriasService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las categorías' })
  @ApiResponse({ status: 200 })
  findAll() { return this.svc.findAll(); }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener categoría por ID (incluye sus productos)' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200 }) @ApiResponse({ status: 404 })
  findOne(@Param('id', ParseIntPipe) id: number) { return this.svc.findOne(id); }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva categoría' })
  @ApiResponse({ status: 201 }) @ApiResponse({ status: 400 })
  create(@Body() dto: CreateCategoriaDto) { return this.svc.create(dto); }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una categoría' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200 }) @ApiResponse({ status: 404 })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCategoriaDto) {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar categoría (soft delete)' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 204 }) @ApiResponse({ status: 404 })
  remove(@Param('id', ParseIntPipe) id: number) { return this.svc.remove(id); }
}
