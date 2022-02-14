import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * @description inherits local.strategy.ts logic through AuthGuard by passing 'local' param
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
