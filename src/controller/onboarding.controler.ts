import { IRequest, IResponse } from '../common/http.interface'
import { LoggerHelper } from '../helper/logger'
import { injectable } from 'tsyringe'
import { UserService } from '../services/user.service'
import { AuthService } from '../services/auth.service'
import { TokenService } from '../services/token.service'
import { error } from 'console'
import { BadRequest, HandleErrorResponse } from '../utils/errors/ErrorHandlers'
import { Conflict } from '../exceptions/ErrorHandlers'

@injectable()
export class OnboardingController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private logger: LoggerHelper,
  ) {}

  onboardUser = async (req: IRequest, res: IResponse) => {
    try {
      //verify idToken
    
      let userExists = await this.userService.findUserByEmail(req.body.email)
        if(userExists){
            throw new Conflict("User already exists")
        }
        
        const jwtDecoded = await this.authService.verifyWeb3AuthJwtUsingJose(
            req.body.appPubKey,
            req.body.idToken,
          )

        if(jwtDecoded.email != req.body.email){
          throw new BadRequest("Are you trying to manipulate the email on the frontend???")
        }
        const newUser = await this.userService.onboardUser({
          email: jwtDecoded.email,
          address: req.body.address,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          walletBalance: 0, //ignore this wallet balance
        })
         const response:any = {
           ...newUser.toJSON(),
           id: newUser._id
         }

         delete response._id;
         delete response.__v;
        return res.status(201).json(response)

    } catch (err) {
      console.log(err)
        return HandleErrorResponse(err, res)
    }
  }
}
