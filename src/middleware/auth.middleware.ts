import passport from 'passport';
import { NextFunction } from 'express';
import { IRequest, IResponse } from '../common/http.interface';

// export default (req: IRequest, res: IResponse, next: NextFunction) => {
//   passport.authenticate('jwt', function (err, user) {
//     if (err) return next(err);
//     if (!user)
//       return res.unauthorized(err);
//       delete user.comparePassword
//       delete user.password
//     req.user = user;
//     next();
//   })(req, res, next);
// };

import { TokenService } from '../services/token.service';
import { ForbiddenAccess } from '../utils/errors/ErrorHandlers';
import { BadRequest, HandleErrorResponse } from '../exceptions/ErrorHandlers';

export default (scope: string = null) => {

    return async (req: IRequest, res: IResponse, next) => {
      try {
        let auth = req.headers['x-auth-token']
          ? req.headers['x-auth-token']
          : req.headers['Authorization'];
        if (!auth) {
          throw new ForbiddenAccess("Auth is required")
        }
        let decoded = await TokenService.verifyServiceToken(auth as string);
        req.body['user'] = decoded;
        // console.log(decoded);
        if (scope && !decoded.scopes.includes(scope.toLocaleUpperCase())) {
          throw new ForbiddenAccess("User does not have the required scope")
        }
        next();
      } catch (err) {
        console.log(err)
        return HandleErrorResponse(err, res)
      }
    };
  
};
