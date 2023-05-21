import { IRequest, IResponse } from '../common/http.interface'
import { LoggerHelper } from '../helper/logger'
import { injectable } from 'tsyringe'
import { UserService } from '../services/user.service'
import { AuthService } from '../services/auth.service'
import { TokenService } from '../services/token.service'
import { error } from 'console'
import { BadRequest, HandleErrorResponse } from '../utils/errors/ErrorHandlers'

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
            throw new BadRequest("User already exists")
        }
        const jwtDecoded = await this.authService.verifyWeb3AuthJwtUsingJose(
            req.body.appPubKey,
            req.body.idToken,
          )
        const newUser = await this.userService.onboardUser({
          email: jwtDecoded.email,
          address: req.body.address,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          walletBalance: req.body.walletBalance,
        })
        await this.userService.onboardUser(newUser)
        return res.status(201).json(newUser)

    } catch (err) {
        return HandleErrorResponse(err, res)
    }
  }
}
