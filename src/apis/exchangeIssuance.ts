import { BigNumber, ethers } from 'ethers'
import { toast } from 'react-toastify'
import { getERC20Contract, getExchangeIssuanceContract } from 'utils'
import {
  DAI_ADDRESS,
  HOOT_SET_TOKEN_ADDRESS,
  POLYGON_EXCHANGE_ISSUANCE,
} from 'utils/constants'

export const ethersIssueExactSetFromToken = async (
  library: any,
  tokenAmount: BigNumber,
  maxAmountInput: BigNumber
): Promise<any> => {
  console.log('exactSetFromToken')
  try {
    const eiContract = await getExchangeIssuanceContract(library.getSigner())
    const issueSetTx = await eiContract.issueExactSetFromToken(
      HOOT_SET_TOKEN_ADDRESS,
      DAI_ADDRESS,
      tokenAmount,
      maxAmountInput
    )
    return issueSetTx
  } catch (err) {
    toast.warn('there was an issue with exchange issuance', {
      toastId: 'couldnt-buy',
      autoClose: 4000,
    })
    console.log('error', err)
    return 'idk'
  }
}

export const ethersApproveDAI = async (library: any) => {
  try {
    const daiContract = await getERC20Contract(library.getSigner(), DAI_ADDRESS)
    const approvalSetTx = await daiContract.approve(
      POLYGON_EXCHANGE_ISSUANCE,
      ethers.constants.MaxUint256
    )
    return approvalSetTx
  } catch (err) {
    toast.warn('there was an issue with exchange issuance', {
      toastId: 'approval-error',
      autoClose: 4000,
    })
    console.log('error', err)
    return 'idk'
  }
}

export const ethersDAIAllowance = async (
  account: any,
  library: any
): Promise<BigNumber> => {
  try {
    const daiContract = await getERC20Contract(library.getSigner(), DAI_ADDRESS)
    const allowance = await daiContract.allowance(
      account,
      POLYGON_EXCHANGE_ISSUANCE
    )
    return BigNumber.from(allowance)
  } catch (err) {
    toast.warn('there was an issue getting the allowance', {
      toastId: 'allowance-error',
      autoClose: 4000,
    })
    console.log('error', err)
    return BigNumber.from(0)
  }
}

export const ethersIssueSetForExactToken = async (
  library: any,
  tokenAmount: BigNumber,
  maxAmountInput: BigNumber
): Promise<string> => {
  try {
    const eiContract = await getExchangeIssuanceContract(library.getSigner())
    const issueSetTx = await eiContract.issueSetForExactToken(
      HOOT_SET_TOKEN_ADDRESS,
      DAI_ADDRESS,
      tokenAmount,
      maxAmountInput
    )
    return issueSetTx
  } catch (err) {
    toast.warn('there was an issue with exchange issuance', {
      toastId: 'couldnt-buy',
      autoClose: 4000,
    })
    console.log('error', err)
    return 'idk'
  }
}
