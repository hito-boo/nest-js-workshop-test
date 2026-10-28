import { PartialType } from '@nestjs/mapped-types';
import { CriarUsuarioDto } from './criar-usuario.dto.js';

export class AtualizarUsuarioDto extends PartialType(CriarUsuarioDto) {}