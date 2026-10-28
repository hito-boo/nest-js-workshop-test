import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CriarUsuarioDto {
    @IsNotEmpty({message: "O nome não pode ser vazio."})
    @IsString()
    nome!: string;

    @IsNotEmpty({message: "O e-mail não pode ser vazio."})
    @IsEmail()
    email!: string;

    @IsOptional()
    @IsInt({message: "A idade deve ser um número."})
    idade?: number;
}
