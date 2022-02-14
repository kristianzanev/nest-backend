import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * @description inherits jwt.strategy.ts logic through AuthGuard by passing 'jwt' param
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
