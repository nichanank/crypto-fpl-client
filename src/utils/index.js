import EthCrypto from 'eth-crypto'
import Web3 from 'web3'
import scrypt from 'scrypt-js'

import contracts from '../contracts'

export function getContract(library, contractName) {
  const web3 = new Web3("http://127.0.0.1:7545" || Web3.givenProvider)
  if (contractName === 'FPLCards') {
    return new web3.eth.Contract(contracts.FPLCards.ABI, contracts.FPLCards.address)
  } else {
    return new web3.eth.Contract(contracts.FPL.ABI, contracts.FPL.address)
  }
}

export function getContractAddress(contractName) {
  return contracts[contractName].address
}

export function convertEpochToDatetime(epoch) {
  return new Date(epoch * 1000)
}