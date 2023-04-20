/** @format */

import { injectable } from 'tsyringe';
import { IRequest, IResponse } from '../common/http.interface';
import { HandleErrorResponse } from '../exceptions/ErrorHandlers';
import { LoggerHelper } from '../helper/logger';
import { AuthService } from '../services/auth.service';

@injectable()
export class AuthController {
  constructor(private authService: AuthService, private logger: LoggerHelper) {}


}
