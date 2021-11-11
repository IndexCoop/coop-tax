import { formatEther } from '@ethersproject/units'
import { BigNumber, Contract } from 'ethers'
import { toast } from 'react-toastify'
import {
  APE_REBALANCE_EXT_ABI,
  APE_REBALANCE_EXT_ADDRESS,
} from 'utils/constants'

export const ethersGetVotes = async (
  address: string | null | undefined,
  library: any
): Promise<number> => {
  const votingContract = await new Contract(
    APE_REBALANCE_EXT_ADDRESS,
    APE_REBALANCE_EXT_ABI,
    library
  )
  try {
    console.log('beforeVoteCoubt')
    const voteCount: any = await votingContract.getVotes(address)
    console.log('badVoteGet', voteCount)
    return parseInt(formatEther(voteCount))
  } catch (err) {
    toast.warn("You've already voted this epoch", {
      toastId: 'already-voted',
      autoClose: 4000,
    })
    return 0
  }
}

export const ethersGetMaxComponents = async (library: any): Promise<number> => {
  const votingContract = await new Contract(
    APE_REBALANCE_EXT_ADDRESS,
    APE_REBALANCE_EXT_ABI,
    library
  )
  const maxComponents: BigNumber = await votingContract.maxComponents()
  return maxComponents.toNumber()
}

export const ethersVote = async (
  library: any,
  components: string[],
  votes: BigNumber[]
) => {
  const votingContract = await new Contract(
    APE_REBALANCE_EXT_ADDRESS,
    APE_REBALANCE_EXT_ABI,
    library.getSigner()
  )
  await votingContract.vote(components, votes)
}
