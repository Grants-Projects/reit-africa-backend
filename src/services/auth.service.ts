/** @format */

import { User, UserType } from '../models';
import { injectable } from 'tsyringe';
import { TokenService } from './token.service';
import { BadRequest, ResourceNotFoundError } from '../exceptions/ErrorHandlers';

@injectable()
export class AuthService {
  constructor(
  
  ) {}

  loginUser = async (body: any) => {

      const { email, password } = body;
      const user = await User.findOne({
        where: {
          email
        }
      })

      if (!user) {
        throw new ResourceNotFoundError("user with email does not exists")
      }

      const token: any = await TokenService.generateUserToken(
        {
          userId: user.id,
          scopes: ['verified', UserType[user.userType.toLowerCase()]],
          payload: {
            id: user.id,
            email: user.email
          },
        },
        'reit-africa'
      );
     
      if (!(await User.comparePasswords(password, user.password))) {
       throw new BadRequest("password is incorrect!")
      }

      const data = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: token.token,
      };
      return data
  
  };

  


}
