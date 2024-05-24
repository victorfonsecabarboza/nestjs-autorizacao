/**
 * Enumeração para papéis de usuário.
 * Define os possíveis papéis de usuário no sistema.
 */
export enum Role {
    Admin = 'admin',    // Papel de administrador
    Client = 'client',  // Papel de cliente
}

/**
 * Interface representando um usuário no sistema.
 * Contém informações básicas do usuário.
 */
export interface User {
    id: string;         // Identificador único do usuário
    userName: string;   // Nome de usuário
    password: string;   // Senha
    role: Role;         // Papel do usuário
}

/**
 * Interface representando a resposta de autenticação.
 * Contém o usuário autenticado e o token gerado.
 */
export interface IAuthenticate {
    readonly user: User;   // Usuário autenticado
    readonly token: string;  // Token de autenticação
}
