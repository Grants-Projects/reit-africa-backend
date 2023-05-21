import { Schema, model } from "mongoose";
import { MongooseUuid } from "../database/types/mongoose-uuid.type";
import crypto from "crypto"

interface IDocumentSchema {
    title: string
    image: string
}

const documentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

export default model<IDocumentSchema>("propertyDocuments", documentSchema)