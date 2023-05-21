import { Schema, model } from 'mongoose'
import { MongooseUuid } from '../database/types/mongoose-uuid.type'
import crypto from 'crypto'

export enum PropertyStatus {
  PENDING,
  VERIFIED,
  REJECTED,
}

interface IProperty {
  name: string
  latitude: number
  longitude: number
  price: number
  totalShares: number
  images: string[]
  blockchainHash: string
  status: PropertyStatus
}

const propertySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    totalShares: {
      type: Number,
      required: true,
    },
    images: {
      type: Array,
    },
    propertyDocuments: [
      {
        title: {
          type: String,
          required: true,
        },

        imageUrl: {
          type: String,
          required: true,
        },
      },
    ],
    pricePerShare: {
      type: Number
    },
    blockchainHash: {
      type: String,
      unique: true,
      sparse: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(PropertyStatus),
      default: PropertyStatus.PENDING,
    },
  },
  {
    timestamps: true,
  },
)

export default model<IProperty>('properties', propertySchema)
