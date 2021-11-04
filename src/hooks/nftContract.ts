import { useContractCall } from '@usedapp/core'
import { BigNumber, utils } from 'ethers'
import {
  APE_REBALANCE_EXT_ABI,
  APE_REBALANCE_EXT_ADDRESS,
} from 'utils/constants'

export const useGetVotes = (nftId: BigNumber): number => {
  const [getVotes] =
    useContractCall({
      abi: new utils.Interface(APE_REBALANCE_EXT_ABI),
      address: APE_REBALANCE_EXT_ADDRESS,
      method: 'getVotes',
      args: [nftId],
    }) ?? []
  return getVotes.toNumber()
}
