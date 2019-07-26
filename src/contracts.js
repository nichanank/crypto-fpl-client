const FPLC = require('./contracts/CryptoFPL.json')
const FPLCardsC = require('./contracts/CryptoFPLCards.json')

const getFirstNetwork = obj => {
  const k = Object.keys(obj)[0]
  const address = obj[k].address
  return address
}

const FPL = {
  ABI: FPLC.abi,
  address: getFirstNetwork(FPLC.networks)
}
const FPLCards = {
  ABI: FPLCardsC.abi,
  address: getFirstNetwork(FPLCardsC.networks)
}

export default {
  FPL,
  FPLCards
}