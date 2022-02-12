import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * @description this using local.strategy.ts through AuthGuard by passing 'local' param
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
