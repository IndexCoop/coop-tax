import { Provider } from '@ethersproject/abstract-provider'
import { formatEther } from '@ethersproject/units'
import { BigNumber, Contract, Signer } from 'ethers'
import { toast } from 'react-toastify'
import { getExchangeIssuanceContract } from 'utils'
import {
  POLYGON_EXCHANGE_ISSUANCE,
  POLYGON_EXCHANGE_ISSUANCE_ABI,
} from 'utils/constants'

/**
 * checks for token approvals
 * @param address
 * @param library
 * @returns
 */
export const ethersCheckTokenApproval = async (
  address: string | null | undefined,
  library: any
): Promise<number> => {
  const eiContract = await getExchangeIssuanceContract(library)

  return 0
}
