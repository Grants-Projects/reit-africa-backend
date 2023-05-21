/** @format */
import { injectable } from 'tsyringe'
import { TokenService } from './token.service'
import { BadRequest, ResourceNotFoundError, UnauthorizedAccess } from '../exceptions/ErrorHandlers'
import * as jose from 'jose'

@injectable()
export class AuthService {
  constructor() {}

  public verifyWeb3AuthJwtUsingJose = async (
    appPubKey: string,
    idToken: string,
  ): Promise<any> => {
    const jwks = jose.createRemoteJWKSet(
      new URL('https://api.openlogin.com/jwks'),
    )
    const jwtDecoded = await jose.jwtVerify(idToken, jwks, {
      algorithms: ['ES256'],
    })

    if ((jwtDecoded.payload as any).wallets[0].public_key === appPubKey) {
      return jwtDecoded.payload
    }
    throw new UnauthorizedAccess("Kindly be sure you are using the correct token and app_pub_key from web3 auth")
  }
}
