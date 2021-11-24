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
    const voteCount: any = await votingContract.getVotes(address)
    return parseInt(formatEther(voteCount))
  } catch (err) {
    toast.warn("you've already voted this epoch", {
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
  try {
    const maxComponents: BigNumber = await votingContract.maxComponents()
    return maxComponents.toNumber()
  } catch (err) {
    return 0
  }
}

export const ethersVote = async (
  library: any,
  components: string[],
  votes: BigNumber[]
) => {
  try {
    const votingContract = await new Contract(
      APE_REBALANCE_EXT_ADDRESS,
      APE_REBALANCE_EXT_ABI,
      library.getSigner()
    )
    await votingContract.vote(components, votes)
  } catch (err) {
    toast.warn('there was a problem submitting the vote', {
      toastId: 'failed-to-vote',
      autoClose: 4000,
    })
  }
}

export const ethersIsTokenLiquid = async (
  library: any,
  address: string
): Promise<boolean> => {
  try {
    const votingContract = await new Contract(
      APE_REBALANCE_EXT_ADDRESS,
      APE_REBALANCE_EXT_ABI,
      library.getSigner()
    )

    return await votingContract.isTokenLiquid(address)
  } catch (err) {
    toast.warn('there was a problem submitting the vote', {
      toastId: 'failed-to-vote',
      autoClose: 4000,
    })
  }
  return false
}
