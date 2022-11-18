/** @format */

import { injectable } from 'tsyringe';
import { IRequest, IResponse } from '../common/http.interface';
import { StatusCodes } from '../constants copy';
import { HandleErrorResponse } from '../exceptions/ErrorHandlers';
import { LoggerHelper } from '../helper/logger';
import { UserService } from '../services/user.service';

@injectable()
export class UserController {
  constructor(private userService: UserService, private logger: LoggerHelper) {}
  registerUser = async (req: IRequest, res: IResponse) => {
    try {
      const user = await this.userService.registerUser(req.body)
      return res.status(StatusCodes.OK).json(user);
    } catch (err) {
      return HandleErrorResponse(err, res);
    }
  };
}
