import { Injectable, NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker'; // Importa a biblioteca faker para gerar dados falsos
import { IAuthenticate, Role } from './interface/user.interface'; // Importa interfaces necessárias
import { AuthenticateDto } from './dto/authenticate.dto'; // Importa o DTO para autenticação
import { sign } from 'jsonwebtoken'; // Importa a função sign do jsonwebtoken para gerar tokens JWT

@Injectable()
export class AuthService {
    // Dados fictícios de usuários para demonstração
    users = [
        {
            id: faker.datatype.uuid(), // Gera um UUID fictício para o ID do usuário
            userName: 'Fulano 1', // Nome de usuário
            password: 'fulano', // Senha
            role: Role.Admin, // Papel do usuário (Admin neste caso)
        },
        {
            id: faker.datatype.uuid(), // Gera um UUID fictício para o ID do usuário
            userName: 'Ciclano 1', // Nome de usuário
            password: 'ciclano', // Senha
            role: Role.Client, // Papel do usuário (Cliente neste caso)
        }
    ];

    /**
     * Função para autenticar usuários com base no DTO fornecido.
     * @param authenticateDto DTO contendo as credenciais de autenticação (userName e password).
     * @returns Objeto contendo um token JWT e os dados do usuário autenticado.
     * @throws NotFoundException se as credenciais de autenticação forem inválidas.
     */
    authenticate(authenticateDto: AuthenticateDto): IAuthenticate {
        // Procura pelo usuário correspondente nas credenciais fornecidas
        const user = this.users.find(
            (u) =>
                u.userName == authenticateDto.userName &&
                u.password == authenticateDto.password,
        );
        // Se o usuário não for encontrado, lança uma exceção de NotFoundException
        if (!user) {
            throw new NotFoundException('Credenciais inválidas');
        }
        // Gera um token JWT com os dados do usuário e uma chave secreta
        const token = sign({ ...user }, 'secrete');
        // Retorna o token gerado e os dados do usuário autenticado
        return { token, user };
    }
}
