import EthCrypto from 'eth-crypto'
import Web3 from 'web3'
import scrypt from 'scrypt-js'

import contracts from '../contracts'

const crypto = require('crypto')

const networkDataById = {
  1: {
    etherscanPrefix: ''
  },
  3: {
    etherscanPrefix: 'ropsten.'
  },
  4: {
    etherscanPrefix: 'rinkeby.'
  },
  5: {
    etherscanPrefix: 'goerli.'
  },
  42: {
    etherscanPrefix: 'kovan.'
  }
}

const etherscanTypes = {
  address: 'address',
  token: 'token',
  transaction: 'tx'
}

export function getEtherscanLink(networkId, type, data) {  
  const path = etherscanTypes[type]
  const prefix = networkDataById[networkId].etherscanPrefix

  return `https://${prefix}etherscan.io/${path}/${data}`
}

async function getSharedSecret(privateKey, publicKey) {
  const sec = crypto.createECDH('secp256k1')
  sec.setPrivateKey(privateKey.substring(2), 'hex')
  const secret = sec.computeSecret(publicKey, 'hex')

  const N = 16384, r = 8, p = 1, dkLen = 32
  return await new Promise((resolve, reject) => {
    scrypt(secret, Buffer.from('801a2bbb220c4bdc8563c32ca60fb79a', 'hex'), N, r, p, dkLen, (error, _, key) => {
      if (error) {
        reject(error)
      }

      if (key) {
        resolve(new Uint8Array(key))
      }
    })
  })
}

async function getCipher(privateKey, publicKey) {
  const algorithm = 'aes-256-cbc'
  const secret = await getSharedSecret(privateKey, publicKey)
  const iv = crypto.randomBytes(16)

  const cipher = crypto.createCipheriv(algorithm, secret, iv)

  return { cipher, iv }
}

async function getDecipher(privateKey, publicKey, iv) {
  const algorithm = 'aes-256-cbc'
  const secret = await getSharedSecret(privateKey, publicKey)
  const decipher = crypto.createDecipheriv(algorithm, secret, iv)
  return decipher
}

export async function encryptMessage(plaintext, privateKey, publicKey) {
  const { cipher, iv } = await getCipher(privateKey, publicKey)
  let encrypted = cipher.update(plaintext, 'utf8', 'hex')
  encrypted += cipher.final('hex')

  const concatenated = `${encrypted}${iv.toString('hex')}`

  return EthCrypto.hex.compress(concatenated, true)
}

export async function decryptMessage(compressedCiphertext, privateKey, publicKey) {
  // decipher compressedCiphertext
  const decompressed = EthCrypto.hex.decompress(compressedCiphertext, true).substring(2)
  const ciphertext = decompressed.substring(0, decompressed.length - 32)
  const iv = Buffer.from(decompressed.substring(decompressed.length - 32), 'hex')

  // get decipherer
  const decipher = await getDecipher(privateKey, publicKey, iv)

  let decrypted = decipher.update(ciphertext, 'hex', 'utf8')
  decrypted += decipher.final('utf8')

  return decrypted
}

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