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
  const rebalContract = await new Contract(
    APE_REBALANCE_EXT_ADDRESS,
    APE_REBALANCE_EXT_ABI,
    library
  )
  try {
    const voteCount: any = await rebalContract.getVotes(address)
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
  const rebalContract = await new Contract(
    APE_REBALANCE_EXT_ADDRESS,
    APE_REBALANCE_EXT_ABI,
    library
  )
  try {
    const maxComponents: BigNumber = await rebalContract.maxComponents()
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
    const rebalContract = await new Contract(
      APE_REBALANCE_EXT_ADDRESS,
      APE_REBALANCE_EXT_ABI,
      library.getSigner()
    )
    await rebalContract.vote(components, votes)
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
    const rebalContract = await new Contract(
      APE_REBALANCE_EXT_ADDRESS,
      APE_REBALANCE_EXT_ABI,
      library.getSigner()
    )

    return await rebalContract.isTokenLiquid(address)
  } catch (err) {
    toast.warn('there was a problem submitting the vote', {
      toastId: 'failed-to-vote',
      autoClose: 4000,
    })
  }
  return false
}

export const ethersGetSetValue = async (library: any): Promise<BigNumber> => {
  try {
    const rebalContract = await new Contract(
      APE_REBALANCE_EXT_ADDRESS,
      APE_REBALANCE_EXT_ABI,
      library.getSigner()
    )

    return await rebalContract.getSetValue()
  } catch (err) {
    toast.warn('there was a problem retrieving the set value', {
      toastId: 'failed-to-value',
      autoClose: 4000,
    })
    return BigNumber.from(0)
  }
}
