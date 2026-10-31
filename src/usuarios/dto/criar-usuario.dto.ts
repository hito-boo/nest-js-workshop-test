import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CriarUsuarioDto {
    @ApiProperty({ example: 'Carlos' })
    @IsNotEmpty({message: "O nome não pode ser vazio."})
    @IsString()
    nome!: string;

    @ApiProperty({
        example: 'carlos@uem.br',
        description: 'E-mail com domínio @uem.br',
    })
    @IsNotEmpty({message: "O e-mail não pode ser vazio."})
    @IsEmail()
    email!: string;

    @ApiPropertyOptional({ example: 25, type: 'integer' })
    @IsOptional()
    @IsInt({message: "A idade deve ser um número."})
    idade?: number;
}
