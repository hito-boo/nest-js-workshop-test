import { Injectable } from '@nestjs/common';
import { Usuario } from './usuario.interface.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CriarUsuarioDto } from './dto/criar-usuario.dto.js';
import { AtualizarUsuarioDto } from './dto/atualizar-usuario.dto.js';

@Injectable()
export class UsuariosService {
  private usuarios: Usuario[] = [
    { id: 1, nome: 'Ana Paula Crippa', email: 'ana@uem.br' },
    { id: 2, nome: 'Josh Dun', email: 'josh@uem.br' },
    { id: 3, nome: 'Lucas Fratus', email: 'lucas@uem.br' },
    { id: 4, nome: 'Oliver Sykes', email: 'oliver@uem.br' },
    { id: 5, nome: 'Tyler Joseph', email: 'tyler@uem.br' },
  ];
  private proximoId = this.usuarios.length + 1;

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
    return usuario;
  }

  async criar(dados: CriarUsuarioDto) {
    const novoUsuario = await this.prisma.usuario.create({data: dados});
    return novoUsuario;
  }

  async atualizar(id: number, dados: AtualizarUsuarioDto) {
    const usuario = await this.buscar(id);
    if (!usuario) return;
    await this.prisma.usuario.update({
      where: { id },
      data: dados,
    });
    return this.buscar(id);
  }

  async remover(id: number) {
    const usuario = await this.buscar(id);
    if (!usuario) return;
    await this.prisma.usuario.delete({
      where: {id},
    });
  }
}
