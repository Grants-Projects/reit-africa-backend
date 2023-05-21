import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/Model/IUser';
import { MongooseUuid } from '../database/types/mongoose-uuid.type';
import crypto from "crypto";

// Create the user schema
const UserSchema = new Schema(
  {
    _id: {
      type: MongooseUuid,
      default: () => crypto.randomUUID(),
      requited: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    address:{
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    walletBalance: {
      type: Number,
      required: true
    } 
  },
  {
    timestamps: true,
  }
);


// Create and export user model
export default model<IUser>('Users', UserSchema);

// export default User;
