import axios from 'axios'

import { POLYGON_CHAIN_DATA } from 'utils/connectors'

/**
 * Market Data from Coingecko
 * www.coingecko.com/en/api/documentation
 */

type CoinGeckoCoinPrices = {
  [address: string]: {
    usd: number
  }
}

type CoinGeckoCoinEthPrices = {
  ethereum: {
    usd: number
  }
}

/**
 * Get USD market prices for ETH
 */
export const getEthPrice = async (): Promise<number> => {
  try {
    const { data } = await axios.get<CoinGeckoCoinEthPrices>(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
    )
    return data.ethereum.usd
  } catch (e) {
    console.error(e)
    return Promise.reject(0)
  }
}

/**
 * Get USD market prices for a list of tokens
 * @param assetPlatform Coingecko asset platform ID (/asset_platforms)
 */
export const getTokenPrices = async (
  contractAddresses: string[],
  assetPlatform: string = POLYGON_CHAIN_DATA.coingeckoId
): Promise<CoinGeckoCoinPrices> => {
  try {
    const { data } = await axios.get<CoinGeckoCoinPrices>(
      `https://api.coingecko.com/api/v3/simple/token_price/${assetPlatform}?vs_currencies=usd&contract_addresses=${contractAddresses}`
    )
    return data
  } catch (e) {
    console.error(e)
    return Promise.reject({})
  }
}
