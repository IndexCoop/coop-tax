import { useEffect, useState } from 'react'
import axios from 'axios'
import { BigNumber } from '@ethersproject/bignumber'
import { useEthers } from '@usedapp/core'
import {
  Button,
  Flex,
  Text,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react'

import { ethersIssueFromWeth } from 'apis/exchangeIssuance'
import { toWei } from 'utils'

const TokenPurchase = () => {
  const [tokenAmount, setTokenAmount] = useState<number>(1)
  const [ethPriceUSD, setEthPriceUSD] = useState<number>(1)
  const { account, library } = useEthers()

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
      )
      .then((response) => {
        setEthPriceUSD(response.data['ethereum'].usd)
      })
  }, [])

  const mintTokens = async () => {
    console.log(
      'txparams',
      account,
      library,
      tokenAmount,
      toWei(BigNumber.from(1).div(Math.floor(ethPriceUSD)).add(1)).toString()
    )
    const tx = await ethersIssueFromWeth(
      library,
      toWei(BigNumber.from(tokenAmount)),
      toWei(BigNumber.from(1).div(Math.ceil(ethPriceUSD)).add(1)) // effective max spend $1 ish
    )
    console.log('tx', tx)
  }

  const formatValue = (val: number) => {
    return val ? Math.round(val) : 0
  }

  return (
    <Flex flexDirection='column' alignItems='center'>
      <Text fontWeight='bold'>HOOT Index</Text>
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

      <Button
        width='150px'
        mt='20px'
        colorScheme='telegram'
        variant='solid'
        onClick={mintTokens}
      >
        mint tokens
      </Button>
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
