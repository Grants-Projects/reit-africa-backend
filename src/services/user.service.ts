/** @format */

import { injectable } from 'tsyringe';
import { BadRequest } from '../exceptions/ErrorHandlers';
import { User, UserStatus } from '../models';
import { ResourceNotFoundError } from '../utils/errors/ErrorHandlers';

@injectable()
export class UserService {
  constructor(
  ) {}

  registerUser = async (body: any): Promise<User> => {
    await this.checkIfUserEmailExists(body.email);
    body.status = UserStatus.VERIFIED;
    const user = await User.create(body).save();
    delete user.password
    return user
  };

  private checkIfUserEmailExists = async (email: string): Promise<void> => {
    const user = await User.findOne({
      where: {
        email
      }
    })
    if(user){
      throw new BadRequest("user with email already exists")
    }
  }
}
