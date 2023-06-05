import { injectable } from 'tsyringe'
import { uploadToIPFS, getContract, callContractFunctions} from '../utils/web3'
import {ethers} from 'ethers';
import { config } from '../config';


@injectable()
export class Web3Service {
 constructor() {}

 private async uploadToIPFS(data){
    return await uploadToIPFS(data)
 }

 public async uploadToBlockchain(data: any) {
     const contract = await getContract();
     console.log("contract", contract)
     const prepareMetaData = JSON.stringify({
         id: data._id,
         name: data.name,
         latitude: data.latitude,
         longitude: data.longitude,
         totalShares: data.totalShares,
         images: data.images,
         price: data.price,
         propertyDocuments: data.propertyDocuments,
         createdAt: data.createdAt
     })
     const ipfsHash = await this.uploadToIPFS(prepareMetaData)
     
     const methodName = 'addProperty';
     const methodArgs = [data.name, data.latitude, data.longitude, data.price, ipfsHash, data.totalShares];

        // const transactionObject = {
        // to: config.web3.contract_address,
        // data: contract.interface.encodeFunctionData(methodName, methodArgs),
        // };

        console.log(ethers.parseUnits('5800', 'gwei'))


    //const txtn = await contract.getPropertySharesCount(123454);
    //  const transactionObject = await contract.addProperty(data.name, data.latitude, data.longitude, data.price, ipfsHash, data.totalShares, {
    //     gasPrice: ethers.parseUnits('250', 'gwei')
    //   });
    //  const trxWait = transactionObject.wait();
    //  console.log({transactionObject})
     //https://ipfs.io/ipfs/QmfSxoi1DqcfPXc8sFdVnfr7tk5y9t3er9gHDEptmtgPPz

     //console.log("contract", contract);

     await callContractFunctions("addProperty", methodArgs);
 }

}


