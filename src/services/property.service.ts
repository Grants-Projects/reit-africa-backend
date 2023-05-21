import PropertyModel, { PropertyStatus } from "../models/property.model"
import { ResourceNotFoundError } from "../utils/errors/ErrorHandlers"
import uuidValidate from "uuid-validate"
export class PropertyService {

    saveProperty = async (name, latitude, longitude, price, totalShares, images, pricePerShare) => {
      const add = new PropertyModel({
            name,
            latitude,
            longitude,
            price,
            totalShares,
            images,
            status: PropertyStatus.PENDING,
            pricePerShare
        })
       return  await add.save()
    }

    findPropertyById = async (id: string) => {
        console.log("id", uuidValidate(id))
      const property = await PropertyModel.findOne({ _id: id});
      if(!property){
        throw new ResourceNotFoundError("Property with property id does not exist")
      }
      return property;
    }

}