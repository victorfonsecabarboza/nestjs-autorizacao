import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  /**
   * Verifica se o papel do usuário corresponde a algum dos papéis permitidos.
   * @param roles Papéis permitidos
   * @param userRole Papel do usuário
   * @returns true se o usuário tem permissão, caso contrário false
   */
  matchRoles(roles: string[], userRole: string) {
    return roles.some((role) => role === userRole);
  }

  /**
   * Determina se a requisição pode ser processada com base nos papéis do usuário.
   * @param context Contexto de execução da requisição
   * @returns true se o usuário tem permissão ou se nenhum papel é definido para a rota, caso contrário false
   */
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true; // Se nenhum papel é definido, a requisição é permitida
    }

    // Obtém o objeto request do contexto HTTP
    const request = context.switchToHttp().getRequest();

    // Obtém o objeto user do request, que deve ser definido no middleware de autenticação
    const user = request.user;

    // Verifica se o papel do usuário corresponde a algum dos papéis permitidos
    return this.matchRoles(roles, user.role);
  }
}
