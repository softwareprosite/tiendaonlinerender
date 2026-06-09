import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { OrdenProductoService } from './orden-producto.service';
import { CreateOrdenProductoDto } from './dto/create-orden-producto.dto';
import { UpdateOrdenProductoDto } from './dto/update-orden-producto.dto';

@ApiTags('Orden-Producto')
@Controller('orden_producto')
export class OrdenProductoController {
  constructor(private readonly svc: OrdenProductoService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los registros orden-producto' })
  @ApiResponse({ status: 200 })
  findAll() { return this.svc.findAll(); }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener registro orden-producto por ID' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200 }) @ApiResponse({ status: 404 })
  findOne(@Param('id', ParseIntPipe) id: number) { return this.svc.findOne(id); }

  @Post()
  @ApiOperation({ summary: 'Agregar un producto a una orden' })
  @ApiResponse({ status: 201 }) @ApiResponse({ status: 400 }) @ApiResponse({ status: 404 })
  create(@Body() dto: CreateOrdenProductoDto) { return this.svc.create(dto); }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar cantidad o precio unitario' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200 }) @ApiResponse({ status: 404 })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateOrdenProductoDto) {
    return this.svc.update(id, dto);
  }

  @Delete(':idOrden/productos/:productId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Quitar un producto de una orden' })
  @ApiParam({ name: 'idOrden' }) @ApiParam({ name: 'productId' })
  @ApiResponse({ status: 204 }) @ApiResponse({ status: 404 })
  removeProductoDeOrden(
    @Param('idOrden', ParseIntPipe) idOrden: number,
    @Param('productId', ParseIntPipe) productId: number,
  ) { return this.svc.removeProductoDeOrden(idOrden, productId); }
}
