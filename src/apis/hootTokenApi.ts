import { BigNumber, utils } from 'ethers'

import { getEthPrice } from 'apis/coingeckoApi'
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

    return BigNumber.from(total).div(TEN_POW_18).toNumber()
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
