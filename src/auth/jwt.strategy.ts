import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrai o token JWT do cabeçalho de autorização Bearer
            ignoreExpiration: false, // Define se deve ignorar a expiração do token JWT
            secretOrKey: 'secrete', // Chave secreta para verificar a assinatura do token JWT
        });
    }

    /**
     * Método para validar e extrair dados do payload do token JWT.
     * @param payload Payload do token JWT contendo informações do usuário.
     * @returns Objeto com os dados do usuário extraídos do token JWT.
     */
    async validate(payload) {
        return {
            userId: payload.id, // ID do usuário extraído do payload do token
            userName: payload.userName, // Nome de usuário extraído do payload do token
            role: payload.role, // Papel do usuário extraído do payload do token
        };
    }
}
