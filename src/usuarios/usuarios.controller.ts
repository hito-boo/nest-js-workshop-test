import { Controller, Get, Post, Patch, Delete, Param, Body, Query, HttpCode, ParseIntPipe } from '@nestjs/common';
import { UsuariosService } from './usuarios.service.js';
import { CriarUsuarioDto } from './dto/criar-usuario.dto.js';
import { AtualizarUsuarioDto } from './dto/atualizar-usuario.dto.js';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  async listar(@Query('nome') nome?: string) {
    return await this.usuariosService.listar(nome);
  }

  @Get(':id')
  async listarId(@Param('id') id: string) {
    return await this.usuariosService.buscar(Number(id));
  }

  @Post()
  async criar(@Body() dados: CriarUsuarioDto) {
    return await this.usuariosService.criar(dados);
  }

  @Patch(':id')
  async atualizar(@Param('id', ParseIntPipe) id: number, @Body() dados: AtualizarUsuarioDto) {
    return await this.usuariosService.atualizar(id, dados);
  }

  @Delete(':id')
  @HttpCode(204)
  async remover(@Param('id', ParseIntPipe) id: number) {
    await this.usuariosService.remover(id);
  }
}
