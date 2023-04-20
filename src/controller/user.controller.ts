/** @format */

import { injectable } from 'tsyringe';
import { IRequest, IResponse } from '../common/http.interface';
import { HandleErrorResponse } from '../exceptions/ErrorHandlers';
import { LoggerHelper } from '../helper/logger';
import { UserService } from '../services/user.service';

@injectable()
export class UserController {
  constructor(private userService: UserService, private logger: LoggerHelper) {}
  
}
