import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CriarUsuarioDto } from './dto/criar-usuario.dto.js';
import { AtualizarUsuarioDto } from './dto/atualizar-usuario.dto.js';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async listar(nome?: string) {
    if (nome) {
      const usuarios = await this.prisma.usuario.findMany({
        where: {nome: {contains: nome}}
      });
      return usuarios;
    }
    const usuarios = await this.prisma.usuario.findMany();
    return usuarios;
  }

  async buscar(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id }
    });
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return usuario;
  }

  async criar(dados: CriarUsuarioDto) {
    const novoUsuario = await this.prisma.usuario.create({data: dados});
    return novoUsuario;
  }

  async atualizar(id: number, dados: AtualizarUsuarioDto) {
    await this.buscar(id);
    return this.prisma.usuario.update({
      where: { id },
      data: dados,
    });
  }

  async remover(id: number) {
    await this.buscar(id);
    await this.prisma.usuario.delete({
      where: {id},
    });
  }
}
