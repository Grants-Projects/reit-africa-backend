import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/Model/IUser';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';

import * as crypto from 'crypto';


// Create the user schema
const UserSchema = new Schema<IUser>(
  {
    
  },
  {
    timestamps: true,
  }
);


// Create and export user model
export default model<IUser>('Users', UserSchema);

// export default User;
