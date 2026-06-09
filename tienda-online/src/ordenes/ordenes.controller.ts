import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { OrdenesService } from './ordenes.service';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';

@ApiTags('Ordenes')
@Controller('ordenes')
export class OrdenesController {
  constructor(private readonly svc: OrdenesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las órdenes' })
  @ApiResponse({ status: 200 })
  findAll() { return this.svc.findAll(); }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener orden por ID con todos sus productos' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200 }) @ApiResponse({ status: 404 })
  findOne(@Param('id', ParseIntPipe) id: number) { return this.svc.findOne(id); }

  @Post()
  @ApiOperation({ summary: 'Crear orden asociada a un cliente existente' })
  @ApiResponse({ status: 201 }) @ApiResponse({ status: 400 }) @ApiResponse({ status: 404 })
  create(@Body() dto: CreateOrdenDto) { return this.svc.create(dto); }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar el estado de la orden' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200 }) @ApiResponse({ status: 404 })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateOrdenDto) {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar orden (soft delete)' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 204 }) @ApiResponse({ status: 404 })
  remove(@Param('id', ParseIntPipe) id: number) { return this.svc.remove(id); }
}
