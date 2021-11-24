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
  ethersApproveDAI,
  ethersDAIAllowance,
  ethersIssueExactSetFromToken,
} from 'apis/exchangeIssuance'
import { toWei } from 'utils'
import { toast } from 'react-toastify'

const TokenPurchase = () => {
  const [tokenAmount, setTokenAmount] = useState<number>(1)
  const [approving, setApproving] = useState<boolean>(false)
  const [initialAllowanceChecked, setInitialAllowanceChecked] =
    useState<boolean>(false)
  const [allowance, setAllowance] = useState<BigNumber>(BigNumber.from(0))
  const { account, library } = useEthers()

  //makes initail check for allowance
  useEffect(() => {
    if (!initialAllowanceChecked) {
      ethersDAIAllowance(account, library).then((res) => {
        setAllowance(res)
      })
      setInitialAllowanceChecked(true)
    }
  }, [account, allowance, initialAllowanceChecked, library])

  //checks every 3s if allowance is set
  useEffect(() => {
    if (initialAllowanceChecked && allowance.eq(0)) {
      setTimeout(() => {
        ethersDAIAllowance(account, library).then((res) => {
          setAllowance(res)
        })
      }, 3000)
    }
  }, [account, allowance, initialAllowanceChecked, library])

  const mintTokens = async () => {
    console.log(
      'txparams',
      account,
      library,
      toWei(BigNumber.from(tokenAmount)).toString(),
      toWei(BigNumber.from(tokenAmount).add(1)).toString()
    )
    const tx = await ethersIssueExactSetFromToken(
      library,
      toWei(BigNumber.from(tokenAmount)),
      toWei(BigNumber.from(tokenAmount).add(1)) // effective max spend 1 DAI
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
    ethersApproveDAI(library).then((res) => {
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
    let buttonText = approving ? 'approving...' : 'approve DAI'
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
