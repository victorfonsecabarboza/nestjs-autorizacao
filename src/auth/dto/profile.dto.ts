import { IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../interface/user.interface';

/**
 * Data Transfer Object (DTO) para perfil de usuário.
 * Utilizado para validar e transferir dados do perfil.
 */
export class ProfileDto {
    /**
     * Identificador único do perfil.
     * Deve ser uma string não vazia.
     */
    @IsNotEmpty()
    @IsString()
    readonly id: string;

    /**
     * Nome de usuário do perfil.
     * Deve ser uma string não vazia.
     */
    @IsNotEmpty()
    @IsString()
    readonly userName: string;

    /**
     * Senha do perfil.
     * Deve ser uma string não vazia.
     */
    @IsNotEmpty()
    @IsString()
    readonly password: string;

    /**
     * Papel ou função do perfil.
     * Deve ser uma string não vazia.
     */
    @IsNotEmpty()
    @IsString()
    readonly role: Role;
}
