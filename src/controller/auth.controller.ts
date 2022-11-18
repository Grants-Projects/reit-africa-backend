/** @format */

import { injectable } from 'tsyringe';
import { IRequest, IResponse } from '../common/http.interface';
import { StatusCodes } from '../constants copy';
import { HandleErrorResponse } from '../exceptions/ErrorHandlers';
import { LoggerHelper } from '../helper/logger';
import { AuthService } from '../services/auth.service';

@injectable()
export class AuthController {
  constructor(private authService: AuthService, private logger: LoggerHelper) {}

  loginUser = async (req: IRequest, res: IResponse) => {
    try{
    let response = await this.authService.loginUser(req.body);
    return res.status(StatusCodes.OK).json(response);
    }catch(err){
      return HandleErrorResponse(err, res);
    }
  };

}
