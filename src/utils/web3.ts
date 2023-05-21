import {ethers} from 'ethers';
import { config } from "../config"
import reitAfricaJson from '../Abi/reit-africa.json'
import { create } from 'ipfs-http-client';


export function getProvider() {
    return new ethers.AlchemyProvider("matic", config.web3.alchemi_api_key)
  }

function getSigner() {
    return new ethers.Wallet(config.web3.signer_private_key, getProvider());
}

export async function getContract() {
    return new ethers.Contract(config.web3.contract_address, reitAfricaJson, getSigner())
}

//upload to IPFS
export async function uploadToIPFS(data: any) {
    const auth =
    'Basic ' +
    Buffer.from(
      config.web3.infura_project_id + ':' + config.web3.infura_secret
    ).toString('base64');

    const created = create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        headers: {
            authorization: auth,
          },
    })

    const { cid } = await created.add(data)
    return cid.toString();
}