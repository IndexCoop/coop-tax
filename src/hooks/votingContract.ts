import { useContractCall } from '@usedapp/core'
import { BigNumber, utils } from 'ethers'
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
  return maxComponents ? maxComponents.toNumber() : 0
}

export const useVote = (components: string[], votes: BigNumber[]) => {
  const [vote] =
    useContractCall({
      abi: new utils.Interface(APE_REBALANCE_EXT_ABI),
      address: APE_REBALANCE_EXT_ADDRESS,
      method: 'vote',
      args: [components, votes],
    }) ?? []
  return vote
}
