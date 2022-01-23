import { BigNumber, Contract, Signer } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import {
  ERC20_ABI,
  POLYGON_EXCHANGE_ISSUANCE,
  POLYGON_EXCHANGE_ISSUANCE_ABI,
  SET_TOKEN_ABI,
} from './constants'
import { parseEther } from '@ethersproject/units'

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

export const getSetTokenContract = async (
  provider: Signer | Provider | undefined,
  address: string
): Promise<Contract> => {
  return await new Contract(address, SET_TOKEN_ABI, provider)
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
export const toWei = (number: number, power: number = 18): BigNumber => {
  return parseEther(number.toString()).mul(BigNumber.from(10).pow(18 - power))
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

export const preciseMul = (a: BigNumber, b: BigNumber): BigNumber => {
  return a.mul(b).div(toWei(1))
}
