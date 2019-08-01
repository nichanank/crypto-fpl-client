const FPLC = require('./contracts/CryptoFPL.json')
const FPLCardsC = require('./contracts/CryptoFPLCards.json')

const RINKEBY_ADDRESSES = {
  CryptoFPL: '0x0950ec8A1Fee25bcD778864eEB710351a09106eC',
  CryptoFPLCards: '0xD9A39b00909f3fB447155404aC7CF49136B242d0'
}

const getFirstNetwork = obj => {
  console.log(Object.keys(obj))
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
  FPLCards,
}