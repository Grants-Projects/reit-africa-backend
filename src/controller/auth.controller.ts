/** @format */

import { injectable } from 'tsyringe';
import { IRequest, IResponse } from '../common/http.interface';
import { HandleErrorResponse } from '../exceptions/ErrorHandlers';
import { LoggerHelper } from '../helper/logger';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { BadRequest, ResourceNotFoundError } from '../utils/errors/ErrorHandlers';
import { TokenService } from '../services/token.service'

@injectable()
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService, private logger: LoggerHelper) {}

  loginUser = async(req: IRequest, res: IResponse) => {
     try{
      let userExists = await this.userService.findUserByEmail(req.body.email)
      if(!userExists){
        throw new ResourceNotFoundError("User does not exist")
      }
      await this.authService.verifyWeb3AuthJwtUsingJose(
        req.body.appPubKey,
        req.body.idToken,
      )
      const accessToken:any = await TokenService.generateUserToken({
        userId: userExists.id,
        scopes: [],
        payload: {
        id: userExists.id,
        email: userExists.email
        },
      },
        'reit-africa'
      )

      return res.status(200).json({
        accessToken: accessToken.token
      })

     }catch(err){
      //console.log(err)
      return HandleErrorResponse(err, res)
     }
  }

  verifyUser = async (req: IRequest, res: IResponse) => {
    try {
      if(!req.body?.email){
        throw new BadRequest("Email is required")
      }
      const user = await this.authService.verifyUser(req.body.email);
      if (user) {
        return res.status(200).json({
          message: "USER_AVAILABLE",
        });
      } else {
        return res.status(200).json({
          message: "USER_NOT_AVAILABLE",
        });
      }
    } catch (err) {
      //console.log(err)
      return HandleErrorResponse(err, res);
    }
  };
}
