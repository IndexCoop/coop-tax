import { useEffect, useState } from 'react'
import axios from 'axios'
import { BigNumber } from '@ethersproject/bignumber'
import Select, { createFilter } from 'react-select'
import { toast } from 'react-toastify'
import { useEthers } from '@usedapp/core'
import {
  Button,
  Flex,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

import {
  ethersGetVotes,
  ethersGetMaxComponents,
  ethersVote,
} from 'apis/votingContract'
import SelectedTokens from './SelectedTokens'

const TokenPurchase = () => {
  const [tokenAmount, setTokenAmount] = useState<number>(0)
  const [tokenPriceUSD, setTokenPriceUSD] = useState<number>(0)
  const [tokenPriceETH, setTokenPriceETH] = useState<number>(0)
  const [ethAmount, setEthAmount] = useState<number>(0)
  const { account, library } = useEthers()

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/simple/price?ids=metaverse-index&vs_currencies=usd%2Ceth'
      )
      .then((response) => {
        setTokenPriceUSD(response.data['metaverse-index'].usd)
        setTokenPriceETH(response.data['metaverse-index'].eth)
      })
  }, [])

  return (
    <Flex flexDirection='column' alignItems='center'>
      <Text alignSelf='flex-start' fontWeight='bold'>
        HOOT Index
      </Text>
      <Text alignSelf='flex-start'>
        ${tokenPriceUSD} / {tokenPriceETH} ETH
      </Text>
      <Flex flexDir='row' alignItems='center' mt='15px'>
        <NumberInput
          size='lg'
          maxW={32}
          defaultValue={0}
          min={0}
          precision={2}
          onChange={(valueAsString: string, valueAsNumber: number) =>
            setTokenAmount(valueAsNumber)
          }
        >
          <NumberInputField />
        </NumberInput>
        <Text ml='5px'>$HOOT</Text>
      </Flex>
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
