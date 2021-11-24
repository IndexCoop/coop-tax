import { BigNumber, Contract, Signer } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import {
  ERC20_ABI,
  POLYGON_EXCHANGE_ISSUANCE,
  POLYGON_EXCHANGE_ISSUANCE_ABI,
} from './constants'

/**
 * returns instance of Exchange Issuance Contract
 * @param providerSigner
 * @returns
 */
export const getExchangeIssuanceContract = async (
  providerSigner: Signer | Provider | undefined
): Promise<Contract> => {
  return await new Contract(
    POLYGON_EXCHANGE_ISSUANCE,
    POLYGON_EXCHANGE_ISSUANCE_ABI,
    providerSigner
  )
}

export const getERC20Contract = async (
  provider: Signer | Provider | undefined,
  address: string
): Promise<Contract> => {
  return await new Contract(address, ERC20_ABI, provider)
}

export const getAllowance = async (
  userAddress: string,
  spenderAddress: string,
  tokenAddress: string,
  provider: any
): Promise<BigNumber> => {
  try {
    const tokenContract = await getERC20Contract(provider, tokenAddress)
    const allowance: BigNumber = await tokenContract
      .allowance(userAddress, spenderAddress)
      .call()
    return allowance
  } catch (e) {
    return BigNumber.from(0)
  }
}

/**
 * Converts a number to Wei to another denomination of Eth
 * @param number
 * @param power
 * @returns
 */
export const toWei = (number: BigNumber, power: number = 18) => {
  return number.mul(BigNumber.from(10).pow(power))
}

/**
 * Converts a number from Wei to another denomination of Eth
 * @param number
 * @param power
 * @returns
 */
export const fromWei = (number: BigNumber, power: number = 18) => {
  return number.div(BigNumber.from(10).pow(power))
}
