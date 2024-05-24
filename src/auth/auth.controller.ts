import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './dto/authenticate.dto';
import { JwtAuthGuard } from './jwt.guard'; // Ajuste o caminho para o seu JwtGuard
import { RoleGuard } from './role/role.guard';
import { Roles } from './roles/roles.decorator';

@Controller('auth') // Define o controlador para manipulação de rotas /auth
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    /**
     * Rota POST /auth para autenticar um usuário.
     * @param res Objeto de resposta HTTP do NestJS.
     * @param authenticateDto Dados de autenticação recebidos no corpo da requisição.
     * @returns JSON contendo o resultado da autenticação ou detalhes do erro, conforme apropriado.
     */
    @Post()
    login(@Res() res, @Body() authenticateDto: AuthenticateDto) {
        try {
            // Chama o serviço de autenticação para validar as credenciais
            const response = this.authService.authenticate(authenticateDto);
            // Retorna a resposta de sucesso com o token JWT e dados do usuário
            return res.status(HttpStatus.OK).json({ response });
        } catch (error) {
            // Se ocorrer um erro, retorna uma resposta de erro com status e detalhes do erro
            return res.status(error.status).json(error.response);
        }
    }

    /**
     * Rota protegida por autenticação JWT.
     * Apenas usuários autenticados com um token JWT válido podem acessar esta rota.
     * Retorna o usuário extraído do payload do token JWT.
     * @param req Objeto de requisição do NestJS
     * @param res Objeto de resposta do NestJS
     */
    @Roles('admin') // Apenas usuários com função 'admin' podem acessar esta rota
    @UseGuards(JwtAuthGuard, RoleGuard) // Usa os guards JwtAuthGuard e RoleGuard
    @Get()
    profile(@Req() req, @Res() res) {
         // Retorna o usuário extraído do payload do token JWT
        return res.status(HttpStatus.OK).json(req.user);
    }
}
