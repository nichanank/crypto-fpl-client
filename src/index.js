import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Web3Provider, { Connectors } from 'web3-react'
import Web3 from 'web3'
import { connectors } from './connectors'
import * as serviceWorker from './serviceWorker'

require('materialize-css/dist/css/materialize.min.css')
require('materialize-css')

ReactDOM.render(

  <Web3Provider 
      connectors={connectors}
      libraryName={"web3.js"}
      web3Api={Web3}>
    <App />
  </Web3Provider >
  
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
