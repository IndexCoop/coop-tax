import { useContractCall } from '@usedapp/core'
import { utils } from 'ethers'
import {
  APE_REBALANCE_EXT_ABI,
  APE_REBALANCE_EXT_ADDRESS,
} from 'utils/constants'

export const useMaxComponents = (): number => {
  const [maxComponents] =
    useContractCall({
      abi: new utils.Interface(APE_REBALANCE_EXT_ABI),
      address: APE_REBALANCE_EXT_ADDRESS,
      method: 'maxComponents',
      args: [],
    }) ?? []
  return maxComponents.toNumber()
}
