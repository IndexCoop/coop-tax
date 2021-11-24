import { BigNumber, ethers } from 'ethers'
import { toast } from 'react-toastify'
import { getERC20Contract, getExchangeIssuanceContract } from 'utils'
import {
  HOOT_SET_TOKEN_ADDRESS,
  POLYGON_EXCHANGE_ISSUANCE,
  WETH_ADDRESS,
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
    console.log('error', err)
    return 'idk'
  }
}

export const ethersApproveWETH = async (library: any) => {
  try {
    const wethContract = await getERC20Contract(
      library.getSigner(),
      WETH_ADDRESS
    )
    const approvalSetTx = await wethContract.approve(
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

export const ethersWETHAllowance = async (
  account: any,
  library: any
): Promise<BigNumber> => {
  try {
    const wethContract = await getERC20Contract(
      library.getSigner(),
      WETH_ADDRESS
    )
    const allowance = await wethContract.allowance(
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
