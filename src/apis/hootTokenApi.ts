import { MaticTokens } from '@indexcoop/tokenlists'
import { BigNumber as BigNumberJs } from 'bignumber.js'
import { BigNumber, utils } from 'ethers'

import { getEthPrice, getTokenPrices } from 'apis/coingeckoApi'
import { getSetValue } from 'apis/exchangeIssuance'
import { TEN_POW_18 } from 'utils/constants'
import { getSetTokenContract, fromWei, toWei } from 'utils'
import { HOOT_SET_TOKEN_ADDRESS } from 'utils/constants'

/**
 * Net Asset Value (NAV) per HOOT (USD)
 */
const getHootNav = async (library: any): Promise<string> => {
  const ethPrice = await getEthPrice()
  const nav = await getSetValue(library)

  return parseFloat(
    utils.formatEther(fromWei(nav.mul(toWei(ethPrice))))
  ).toFixed(2)
}

/**
 * Total Token Supply
 */
const getHootTotalSupply = async (library: any): Promise<number> => {
  try {
    const hootContract = await getSetTokenContract(
      library,
      HOOT_SET_TOKEN_ADDRESS
    )
    const total = await hootContract.totalSupply()

    return new BigNumberJs(total.toString()).div(TEN_POW_18).toNumber()
  } catch (e) {
    console.error(e)
    return 0
  }
}

/**
 * Total Market Cap of HOOT (USD)
 */
export const getHootMarketCap = async (library: any) => {
  const price = await getHootNav(library)
  const supply = await getHootTotalSupply(library)

  return Number(price) * supply
}

/**
 * Position data of HOOT underlying tokens
 */
const getHootPositions = async (library: any): Promise<Position[]> => {
  try {
    const hootContract = await getSetTokenContract(
      library,
      HOOT_SET_TOKEN_ADDRESS
    )
    return hootContract.getPositions()
  } catch (e) {
    console.error(e)
    return []
  }
}

/**
 * Consolidation underlying token info into a single component. Info from multiple sources including:
 * position data from smart contract, token metadata from tokenlist, calculated values
 */
const convertPositionToSetComponent = (
  position: Position,
  componentPriceUsd: number,
  hootPriceUsd: number
): SetComponent => {
  const token = getTokenForPosition(position)

  const quantity = new BigNumberJs(position.unit.toString()).div(
    new BigNumberJs(10).pow(token?.decimals ?? 18)
  )

  const totalPriceUsd = quantity.multipliedBy(componentPriceUsd)

  const percentOfSet = totalPriceUsd
    .div(new BigNumberJs(hootPriceUsd))
    .multipliedBy(100)

  return {
    address: position.component,
    id: token?.name?.toLowerCase() ?? '',
    quantity: quantity.toString(),
    symbol: token?.symbol ?? '',
    name: token?.name ?? '',
    image: token?.logoURI ?? '',
    percentOfSet: percentOfSet.toString(),
    percentOfSetNumber: percentOfSet,
    totalPriceUsd: totalPriceUsd.toString(),
  }
}

const getTokenForPosition = (
  position: Position,
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
  components: SetComponent[]
): SetComponent[] => {
  return components.sort((a, b) =>
    b.percentOfSetNumber.gt(a.percentOfSetNumber) ? 1 : -1
  )
}

export const getHootComponents = async (
  library: any
): Promise<SetComponent[]> => {
  const positions = await getHootPositions(library)

  const positionAddresses = positions.map((p) => p.component)
  const componentPrices = await getTokenPrices(positionAddresses)

  const hootPrice = await getHootNav(library)

  const hootComponents = positions.map((p) => {
    return convertPositionToSetComponent(
      p,
      componentPrices[p.component.toLowerCase()]?.usd ?? 0,
      Number(hootPrice)
    )
  })

  return sortPositionsByPercentOfSet(hootComponents)
}

export type SetComponent = {
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
   * The percent of USD this component makes up in the Set.
   * Equivalant to totalPriceUsd / total price of set in USD
   */
  percentOfSet: string

  /**
   * The percent of USD this component makes up in the Set.
   * Equivalant to totalPriceUsd / total price of set in USD
   */
  percentOfSetNumber: BigNumberJs

  /**
   * Quantity of component in the Set
   */
  quantity: string

  /**
   * Token symbol
   * @example "UNI"
   */
  symbol: string

  /**
   * Total price of this component. This is equivalant to quantity of
   * component * price of component.
   */
  totalPriceUsd: string
}

/**
 * The base definition of a SetToken Position
 */
export type Position = {
  /**
   * Address of token in the Position
   */
  component: string
  /**
   * If not in default state, the address of associated module
   */
  module: string
  /**
   * Each unit is the # of components per 10^18 of a SetToken
   */
  unit: BigNumber
  /**
   * The type of position denoted as a uint8
   */
  positionState: number
  /**
   * Arbitrary data
   */
  data: string
}

export interface TokenData {
  chainId: number
  address: string
  name: string
  symbol: string
  decimals: number
  logoURI: string
}
