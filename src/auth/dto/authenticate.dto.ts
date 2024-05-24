import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Data Transfer Object (DTO) para autenticação de usuário.
 * Utilizado para validar e transferir dados de autenticação.
 */
export class AuthenticateDto {
    /**
     * Nome de usuário para autenticação.
     * Deve ser uma string não vazia.
     */
    @IsNotEmpty()
    @IsString()
    readonly userName: string;

    /**
     * Senha para autenticação.
     * Deve ser uma string não vazia.
     */
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}
