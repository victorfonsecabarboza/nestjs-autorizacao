import { Injectable, NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker'
import { IAuthenticate, Role } from './interface/user.interface';
import { AuthenticateDto } from './dto/authenticate.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
    users = [
        {
            id: faker.datatype.uuid(),
            userName: 'Fulano 1',
            password: 'fulano',
            role: Role.Admin,
        },
        {
            id: faker.datatype.uuid(),
            userName: 'Ciclano 1',
            password: 'ciclano',
            role: Role.Client,
        }
    ];

    authenticate(authenticateDto: AuthenticateDto): IAuthenticate {
        const user = this.users.find(
            (u) =>
                u.userName == authenticateDto.userName &&
                u.password == authenticateDto.password,
        );

        if (!user) throw new NotFoundException('Credenciais invalidas');

        const token = sign({ ...user }, 'secrete');

        return { token, user };
    }
}
