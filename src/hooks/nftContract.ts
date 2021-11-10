import { useContractCall } from '@usedapp/core'
import { utils } from 'ethers'
import { OWL_NFT_ABI, OWL_NFT_ADDRESS } from 'utils/constants'

export const useGetVotes = (address: string | null | undefined): number => {
  const [votes] =
    useContractCall({
      abi: new utils.Interface(OWL_NFT_ABI),
      address: OWL_NFT_ADDRESS,
      method: 'getVotes',
      args: [address],
    }) ?? []
  return 100 //votes.toNumber()
}
