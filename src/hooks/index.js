import { useMemo } from 'react'
import { useWeb3Context } from 'web3-react'

import { getContract, getContractAddress } from '../utils'

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