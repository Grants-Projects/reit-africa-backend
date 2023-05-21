/** @format */

import { injectable } from 'tsyringe'
import {
  ResourceNotFoundError,
  ServerError,
} from '../utils/errors/ErrorHandlers'
import UserModel from '../models/user.model'

@injectable()
export class UserService {
  constructor() {}

  public findUserByEmail = async (email: string) => {
    try {
      let response = await UserModel.findOne({ email })
      if (response) return response
      return null
    } catch (err) {
      throw new ServerError(err)
    }
  }

  public onboardUser = async (data: any) => {
    try {
      const newUser = new UserModel({
        ...data,
      })
      return await newUser.save()
    } catch (err) {
      throw new ServerError(err)
    }
  }
}
