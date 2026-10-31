import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
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
    const email = dados.email.trim().toLowerCase();

    if (!email.endsWith('@uem.br')) {
      throw new BadRequestException('Utilize um e-mail da UEM (@uem.br)');
    }

    try {
      return await this.prisma.usuario.create({ data: { ...dados, email } });
    } catch (erro) {
      if (
        erro instanceof Prisma.PrismaClientKnownRequestError &&
        erro.code === 'P2002'
      ) {
        throw new ConflictException('E-mail já cadastrado');
      }
      throw erro;
    }
  }

  async atualizar(id: number, dados: AtualizarUsuarioDto) {
    await this.buscar(id);
    const data = { ...dados };
    if (typeof dados.email === 'string') {
      const email = dados.email.trim().toLowerCase();

      if (!email.endsWith('@uem.br')) {
        throw new BadRequestException('Utilize um e-mail da UEM (@uem.br)');
      }

      data.email = email;
    }
    return this.prisma.usuario.update({
      where: { id },
      data,
    });
  }

  async remover(id: number) {
    await this.buscar(id);
    await this.prisma.usuario.delete({
      where: {id},
    });
  }
}
