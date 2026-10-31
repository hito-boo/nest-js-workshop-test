import { PartialType } from '@nestjs/swagger';
import { CriarUsuarioDto } from './criar-usuario.dto.js';

export class AtualizarUsuarioDto extends PartialType(CriarUsuarioDto) {}
