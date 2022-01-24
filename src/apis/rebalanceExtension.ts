import { formatEther } from '@ethersproject/units'
import { MaticTokens } from '@indexcoop/tokenlists'
import { BigNumber as BigNumberJs } from 'bignumber.js'
import { BigNumber, Contract } from 'ethers'
import { toast } from 'react-toastify'

import {
  TEN_POW_18,
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
  votes: BigNumber[],
  setDisableSubmit: (value: boolean) => void
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
    setDisableSubmit(false)
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

/**
 * Consolidation underlying rebal tokens info into a single component. Info from multiple sources including:
 * weights from smart contract, tokens metadata from tokenlist, voted allocations
 */
const convertPositionToRebalComponent = (
  position: VotedPosition
): RebalComponent => {
  const token = getTokenForPosition(position)

  const votedAllocation = new BigNumberJs(position.weight.toString())
    .div(TEN_POW_18)
    .multipliedBy(100)

  return {
    address: position.component,
    id: token?.name?.toLowerCase() ?? '',
    symbol: token?.symbol ?? '',
    name: token?.name ?? '',
    image: token?.logoURI ?? '',
    percentOfRebal: votedAllocation.toString(),
    percentOfRebalNumber: votedAllocation,
  }
}

const getTokenForPosition = (
  position: VotedPosition,
  tokenList: TokenData[] = MaticTokens
): TokenData => {
  const matchingTokens = tokenList.filter(
    (t) => t.address.toLowerCase() === position.component.toLowerCase()
  )
  if (matchingTokens.length === 0) {
    console.warn(
      `No token for position ${position.component} exists in token lists`
    )
  } else if (matchingTokens.length > 1) {
    console.warn(
      `Multiple tokens for position ${position.component} exist in token lists`
    )
  }
  return matchingTokens[0]
}

const sortPositionsByPercentOfSet = (
  components: RebalComponent[]
): RebalComponent[] => {
  return components.sort((a, b) =>
    b.percentOfRebalNumber.gt(a.percentOfRebalNumber) ? 1 : -1
  )
}

/**
 * getWeights():
 * @dev Fetches the current top voted components and weights. When the rebalance begins,
 * it will set the weights to be identical to the weights given by this function. The
 * weights are measured as the percentage of the total index value, not the unit amounts.
 * @return components address (string[]) Top voted on components
 * @return weights (BigNumber[]) Components weights (not units) as per the vote

 */
export const _getWeights = async (library: any): Promise<VoteWeights> => {
  try {
    const rebalContract = await new Contract(
      APE_REBALANCE_EXT_ADDRESS,
      APE_REBALANCE_EXT_ABI,
      library
    )

    return await rebalContract.getWeights()
  } catch (err) {
    console.error('_getWeights', err)
  }
  return [[], []]
}

export const getSubmittedVotes = async (library: any) => {
  const contractWeights = await _getWeights(library)

  const adddresses = contractWeights[0]
  const weights = contractWeights[1]

  const votedPositions: VotedPosition[] = adddresses.map((addr, index) => ({
    component: addr,
    weight: weights[index],
  }))

  const votedHootComponents = votedPositions.map(
    convertPositionToRebalComponent
  )

  return sortPositionsByPercentOfSet(votedHootComponents)
}
interface TokenData {
  chainId: number
  address: string
  name: string
  symbol: string
  decimals: number
  logoURI: string
}

type VoteWeights = [string[], BigNumber[]]

type VotedPosition = {
  component: string
  weight: BigNumber
}

export type RebalComponent = {
  /**
   * Token address
   * @example "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"
   */
  address: string

  /**
   * Token id
   * @example "uniswap"
   */
  id: string

  /**
   * Token image URL
   * @example "https://assets.coingecko.com/coins/images/12504/thumb/uniswap-uni.png"
   */
  image: string

  /**
   * Token name
   * @example "Uniswap"
   */
  name: string

  /**
   * The percent of units this component makes up in the Set.
   * Equivalant to units / set token units
   */
  percentOfRebal: string

  /**
   * The percent of units this component makes up in the Set.
   * Equivalant to units / set token units
   */
  percentOfRebalNumber: BigNumberJs

  /**
   * Token symbol
   * @example "UNI"
   */
  symbol: string
}
