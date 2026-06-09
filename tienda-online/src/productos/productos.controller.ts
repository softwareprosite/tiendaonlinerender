import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@ApiTags('Productos')
@Controller('productos')
export class ProductosController {
  constructor(private readonly svc: ProductosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los productos (incluye categoría)' })
  @ApiResponse({ status: 200 })
  findAll() { return this.svc.findAll(); }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener producto por ID (incluye su categoría)' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200 }) @ApiResponse({ status: 404 })
  findOne(@Param('id', ParseIntPipe) id: number) { return this.svc.findOne(id); }

  @Post()
  @ApiOperation({ summary: 'Crear producto (requiere idCategoria existente)' })
  @ApiResponse({ status: 201 }) @ApiResponse({ status: 400 }) @ApiResponse({ status: 404 })
  create(@Body() dto: CreateProductoDto) { return this.svc.create(dto); }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un producto' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200 }) @ApiResponse({ status: 404 })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductoDto) {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar producto (soft delete)' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 204 }) @ApiResponse({ status: 404 })
  remove(@Param('id', ParseIntPipe) id: number) { return this.svc.remove(id); }
}
