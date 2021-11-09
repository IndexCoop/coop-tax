import { useContractCall } from '@usedapp/core'
import { BigNumber, utils } from 'ethers'
import {
  APE_REBALANCE_EXT_ABI,
  APE_REBALANCE_EXT_ADDRESS,
} from 'utils/constants'

export const useGetVotesByNft = (nftId: BigNumber): number => {
  const [getVotes] =
    useContractCall({
      abi: new utils.Interface(APE_REBALANCE_EXT_ABI),
      address: APE_REBALANCE_EXT_ADDRESS,
      method: 'getVotes',
      args: [nftId],
    }) ?? []
  return getVotes.toNumber()
}

export const useGetTotalVotesByIndex = (
  address: string,
  nftIndex: number
): number => {
  const [nftId] =
    useContractCall({
      abi: new utils.Interface(APE_REBALANCE_EXT_ABI),
      address: APE_REBALANCE_EXT_ADDRESS,
      method: 'tokenOfOwnerByIndex',
      args: [address, nftIndex],
    }) ?? []
  const votes = useGetVotesByNft(nftId)
  return votes
}

export const useGetVotes = (address: string, nftBalance: number): number => {
  let totalVotes = 0
  for (let i = 0; i < nftBalance; i++) {
    totalVotes += 1 //useGetTotalVotesByIndex(address, i)
    console.log('totalVotes', totalVotes)
  }
  return totalVotes
}
