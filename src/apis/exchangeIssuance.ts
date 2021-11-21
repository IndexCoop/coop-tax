import { BigNumber } from 'ethers'
import { toast } from 'react-toastify'
import { getExchangeIssuanceContract } from 'utils'
import { HOOT_SET_TOKEN_ADDRESS, WETH_ADDRESS } from 'utils/constants'

export const ethersIssueFromWeth = async (
  library: any,
  tokenAmount: BigNumber,
  maxAmountInput: BigNumber
): Promise<string> => {
  try {
    const eiContract = await getExchangeIssuanceContract(library)
    const issueSetTx = await eiContract.issueExactSetFromToken(
      HOOT_SET_TOKEN_ADDRESS,
      WETH_ADDRESS,
      tokenAmount,
      maxAmountInput
    )
    return issueSetTx
  } catch (err) {
    toast.warn('there was an issue with exchange issuance', {
      toastId: 'couldnt-buy',
      autoClose: 4000,
    })
    return 'idk'
  }
}
