import { useReducer, useEffect, useMemo } from 'react'
import { ethers } from 'ethers'
import { useWeb3Context } from 'web3-react'

import { getContract, getContractAddress } from '../utils'

function localStorageReducer(state, action) {
  switch (action.type) {
    case 'SET': {
      return { ...state, ...action.payload }
    }
    case 'UNSET': {
      return {
        ...state,
        ...(action.payload).reduce((accumulator, currentValue) => {
          accumulator[currentValue] = null
          return accumulator
        }, {})
      }
    }
    default: {
      throw Error()
    }
  }
}

function localStorageInit({ key, contentKeys }) {
  const localStorageItem = window.localStorage.getItem(key)
  return localStorageItem ? JSON.parse(localStorageItem) : contentKeys.reduce((accumulator, currentValue) => {
    accumulator[currentValue] = null
    return accumulator
  }, {})
}

export function useLocalStorageObject (key, contentKeys) {
  const [state, dispatch] = useReducer(localStorageReducer, { key, contentKeys }, localStorageInit)

  function setItemLocalStorage (contentKeysAndValues) {
    dispatch({ type: 'SET', payload: contentKeysAndValues })
  }

  function removeItemLocalStorage (contentKeys) {
    dispatch({ type: 'UNSET', payload: contentKeys })
  }

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state))
  })

  return [state, setItemLocalStorage, removeItemLocalStorage]
}

export function useWallet (privateKey) {
  const wallet = useMemo(() => {
    if (privateKey)
      return new ethers.Wallet(privateKey)
    else
      return null
  }, [privateKey])

  return wallet
}

export function useContract(contractName) {
  const context = useWeb3Context()

  const contract = useMemo(() => {
    if (context.library)
      return getContract(context.library, contractName)
    else
      return null
  }, [contractName, context.library])

  return contract
}

export function useContractAddress(contractName) {
  return useMemo(() => getContractAddress(contractName), [contractName])
}