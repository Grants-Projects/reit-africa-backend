import { IRequest, IResponse } from "../common/http.interface";
import { injectable } from "tsyringe";
import PropertyModel, { PropertyStatus } from "../models/property.model";
import { PropertyService } from "../services/property.service";
import { HandleErrorResponse } from "../utils/errors/ErrorHandlers";
import { has } from "config";
import { Web3Service } from "../services/web3.service";


@injectable()
export class PropertyController {
    constructor(private propertyService: PropertyService, private web3Service: Web3Service){}

    addProperty = async (req: IRequest, res: IResponse) => {
      try{
        const {name, latitude, longitude, price, totalShares, images, pricePerShare} = req.body;
         
        const property =  await this.propertyService.saveProperty(name, latitude, longitude, price, totalShares, images, pricePerShare);
        const response = {
            message: "Sucessfully added property",
            data: {
                name: property.name,
                latitude: property.latitude,
                longitude: property.longitude,
                price: property.price,
                totalShares: property.totalShares,
                images: property.images,
                status: property.status,
                id: property._id
            }
        }
        return res.status(201).json(response)    

      }catch(err){
        return HandleErrorResponse(err, res)
      }
    }

    uploadDocuments = async (req: IRequest, res: IResponse) => {
        try{
            const {title, imageUrl} = req.body;
            console.log(req.params.propertyId)
            const property: any = await this.propertyService.findPropertyById(req.params.propertyId);    
            property.propertyDocuments.push({title, imageUrl})
            await property.save()
            return res.status(201).json({message: "uploaded successfully"})
        }catch(err){
            return HandleErrorResponse(err, res)
        }
    }

    approveProperty = async (req: IRequest, res: IResponse) => {
        try{
            const property: any = await this.propertyService.findPropertyById(req.params.propertyId);
            property.status = PropertyStatus.VERIFIED;
            await property.save();

        }catch(err){
            return HandleErrorResponse(err, res);
        }
    }

    publishToBlockchain = async (req: IRequest, res: IResponse) => {
        try{
             const propertyId = req.params.propertyId;
             const property: any = await this.propertyService.findPropertyById(propertyId);
              await this.web3Service.uploadToBlockchain(property);
             


        }catch(err){
            console.log(err)
            return HandleErrorResponse(err, res)
        }
    }

}