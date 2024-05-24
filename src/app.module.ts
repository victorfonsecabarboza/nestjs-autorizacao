import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    AuthModule, // Importa o módulo de autenticação customizado
    PassportModule, // Importa o módulo Passport para autenticação
    JwtModule.register({ // Configuração do módulo JWT
      secret: 'secrete', // Chave secreta para assinar o token JWT
      signOptions: { expiresIn: '1h' }, // Opções de assinatura: expiração em 1 hora
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, JwtStrategy],
})
export class AppModule { }
