import { useEffect, useState } from 'react'
import { BigNumber } from '@ethersproject/bignumber'
import { useEthers } from '@usedapp/core'
import {
  Button,
  Flex,
  Text,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react'

import {
  ethersApproveWETH,
  ethersIssueExactSetFromToken,
  ethersWETHAllowance,
} from 'apis/exchangeIssuance'
import { toWei } from 'utils'
import { toast } from 'react-toastify'
import { ethers } from 'ethers'
import axios from 'axios'

const TokenPurchase = () => {
  const [tokenAmount, setTokenAmount] = useState<number>(1)
  const [etherPrice, setEtherPrice] = useState<number>(1)
  const [approving, setApproving] = useState<boolean>(false)
  const [initialAllowanceChecked, setInitialAllowanceChecked] =
    useState<boolean>(false)
  const [allowance, setAllowance] = useState<BigNumber>(BigNumber.from(0))
  const { account, library } = useEthers()

  //makes initail check for allowance
  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
      )
      .then((response) => {
        setEtherPrice(response.data['ethereum'].usd)
        console.log('response', etherPrice)
      })
    if (!initialAllowanceChecked) {
      ethersWETHAllowance(account, library).then((res) => {
        setAllowance(res)
      })
      setInitialAllowanceChecked(true)
    }
  }, [account, allowance, etherPrice, initialAllowanceChecked, library])

  //checks every 3s if allowance is set
  useEffect(() => {
    if (initialAllowanceChecked && allowance.eq(0)) {
      setTimeout(() => {
        ethersWETHAllowance(account, library).then((res) => {
          setAllowance(res)
        })
      }, 3000)
    }
  }, [account, allowance, initialAllowanceChecked, library])

  const mintTokens = async () => {
    const DOLLAR_WETH = (1 / Math.floor(etherPrice)).toFixed(10).toString()
    console.log(
      'txparams',
      account,
      library,
      toWei(BigNumber.from(tokenAmount)).toString(),
      toWei(BigNumber.from(tokenAmount).add(1)).toString(),
      DOLLAR_WETH,
      ethers.utils.parseEther(DOLLAR_WETH).toString()
    )
    const tx = await ethersIssueExactSetFromToken(
      library,
      toWei(BigNumber.from(tokenAmount)),
      ethers.utils.parseEther(DOLLAR_WETH) //roughly $1 in WETH
    )
    if (tx && tx.type && tx.type === 0 && tx.hash) {
      const successMsg = 'https://polygonscan.com/tx/' + tx.hash
      toast.success(successMsg, {
        toastId: 'mint-tx',
        autoClose: 10000,
      })
    }
    console.log('tx', tx)
  }

  const approveTokens = async () => {
    setApproving(true)
    ethersApproveWETH(library).then((res) => {
      console.log('approval res', res)
    })
  }

  const formatValue = (val: number) => {
    return val ? Math.round(val) : 0
  }

  const MintButton = () => {
    return (
      <Button
        width='150px'
        mt='20px'
        colorScheme='telegram'
        variant='solid'
        onClick={mintTokens}
      >
        mint tokens
      </Button>
    )
  }

  const ApproveButton = () => {
    let buttonText = approving ? 'approving...' : 'approve WETH'
    return (
      <Button
        width='150px'
        mt='20px'
        colorScheme='telegram'
        variant='solid'
        disabled={approving}
        onClick={approveTokens}
      >
        {buttonText}
      </Button>
    )
  }

  return (
    <Flex flexDirection='column' alignItems='center'>
      <Text fontWeight='bold'>HOOT index</Text>
      <Text fontSize='xs'>1 HOOT ~= $1 WETH</Text>
      <NumberInput
        size='lg'
        width='150px'
        defaultValue={1}
        min={1}
        max={100}
        mt='20px'
        onChange={(valueAsString: string, valueAsNumber: number) =>
          setTokenAmount(valueAsNumber)
        }
        value={formatValue(tokenAmount)}
      >
        <NumberInputField />
      </NumberInput>
      {allowance.eq(0) ? ApproveButton() : MintButton()}
      <Text w='25vw' mt='25px' fontSize='sm'>
        redeeming is not enabled yet. we're pretty sure the devs will add it at
        some point. give your funds a kiss goodbye just in case they don't make
        it back from normandy.
      </Text>
      <Text w='25vw' mt='25px' fontSize='xs'>
        voting on coop.tax is currently available to bronze, silver, and gold
        owls who have been airdropped an owl nft on polygon. if you think you
        should've received an airdrop, please bother the crap out of us on the
        #coop-tax discord channel.
      </Text>
    </Flex>
  )
}

export default TokenPurchase

export interface TokenData {
  chainId: number
  address: string
  name: string
  symbol: string
  decimals: number
  logoURI: string
}

export interface TokenVote {
  address: string
  votes: number
}

export interface TokenOption {
  value: string
  label: string
  token: TokenData
}
