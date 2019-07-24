import { Connectors } from "web3-react"

const {
  InjectedConnector,
  NetworkOnlyConnector,
} = Connectors;

const supportedNetworkURLs = {
  1: "https://mainnet.infura.io/v3/a2855c7103a644d29e2864d9865bb72d",
  4: "https://rinkeby.infura.io/v3/a2855c7103a644d29e2864d9865bb72d"
}

const defaultNetwork = 1

const Injected = new InjectedConnector({
  supportedNetworks: [1, 4, 5, 6, 5777]
})

const Network = new NetworkOnlyConnector({
  providerURL: supportedNetworkURLs[1]
})

export const connectors = {
  Injected,
  Network,
} 
