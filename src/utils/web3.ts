import {ethers} from 'ethers';
import { config } from "../config"
import reitAfricaJson from '../Abi/reit-africa.json'
import { create } from 'ipfs-http-client';
import Web3 from 'web3';
import { Transaction } from 'ethereumjs-tx';
import Common, { Chain } from '@ethereumjs/common';


export function getProvider() {
    //return new ethers.AlchemyProvider("matic", config.web3.alchemi_api_key)
    return new Web3(new Web3.providers.HttpProvider(
        'https://polygon-mumbai.infura.io/v3/b4074d04e5e947208fa8b8b601ee57bf'
      ))
    //return new Web3('https://polygon-mumbai.infura.io/v3/b4074d04e5e947208fa8b8b601ee57bf');

  }

function getSigner() {
    //return new ethers.Wallet(config.web3.signer_private_key, getProvider());
}

export async function getContract() {
    console.log("signer", reitAfricaJson)
    //return new ethers.Contract(config.web3.contract_address, reitAfricaJson, getSigner())
    //return new web3.eth.Contract(contractABI, contractAddress);
    
}

export async function callContractFunctions(functionName: string, inputs = []) {
    console.log("inputs", inputs)
    const web3 = getProvider();

    const signer =  getContractSigner(config.web3.signer_private_key, web3);

    web3.eth.accounts.wallet.add(signer);


    const functionJsonInterface:any = getContractFunctionJsonInterface(functionName);

      const tx: any = {
        from: signer.address,
        to: config.web3.contract_address,
        data: web3.eth.abi.encodeFunctionCall(functionJsonInterface, inputs),
      };

      tx.gas = await web3.eth.estimateGas(tx);

       // Sending the transaction to the network
  const receipt = await web3.eth
  .sendTransaction(tx)
  .once("transactionHash", (txhash) => {
    console.log(`Mining transaction ...`);
    console.log(`Transaction hash: ${txhash}`);
  });
}

function getContractSigner(privateKey: string, web3) {
 return web3.eth.accounts.privateKeyToAccount(
    config.web3.signer_private_key
  );
}

function getContractFunctionJsonInterface(functionName) {
   try{
    return reitAfricaJson.find(
        ({name}) => name === functionName // replace 'myFunctionName' with your function's name
      );

   }catch(err) {
       console.log(err)
   }
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