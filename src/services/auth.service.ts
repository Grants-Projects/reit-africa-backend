/** @format */
import { injectable } from 'tsyringe'
import { TokenService } from './token.service'
import { BadRequest, ResourceNotFoundError, UnauthorizedAccess } from '../exceptions/ErrorHandlers'
import * as jose from 'jose'
import userModel from '../models/user.model'
import { ServerError } from '../utils/errors/ErrorHandlers'

@injectable()
export class AuthService {
  constructor() {}

  public verifyWeb3AuthJwtUsingJose = async (
    appPubKey: string,
    idToken: string,
  ): Promise<any> => {
    try{
    const jwks = jose.createRemoteJWKSet(
      new URL('https://api.openlogin.com/jwks'),
    )
    const jwtDecoded = await jose.jwtVerify(idToken, jwks, {
      algorithms: ['ES256'],
    })

    if ((jwtDecoded.payload as any).wallets[0].public_key === appPubKey) {
      return jwtDecoded.payload
    }
    console.log("here");
    throw new UnauthorizedAccess("Kindly be sure you are using the correct token and app_pub_key from web3 auth")
  }catch(err){
    throw new UnauthorizedAccess("Kindly be sure you are using the correct token and app_pub_key from web3 auth")
  }
  }

  public verifyUser = async (email: string): Promise<boolean> => {
    try {
      let response = await userModel.findOne({ email })
      if (response) return true
      return false
    } catch (err) {
      throw new ServerError(err)
    }
  }
}
