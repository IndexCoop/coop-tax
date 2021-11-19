import { Button, Flex, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BigNumber } from '@ethersproject/bignumber'
import Select, { createFilter } from 'react-select'
import { toast } from 'react-toastify'
import { useEthers } from '@usedapp/core'

import {
  ethersGetVotes,
  ethersGetMaxComponents,
  ethersVote,
} from 'apis/votingContract'
import SelectedTokens from './SelectedTokens'

const TokenPurchase = () => {
  const [tokenOptions, setTokenOptions] = useState<TokenOption[]>([])
  const [selectedTokens, setSelectedTokens] = useState<TokenData[]>([])
  const [maxComponents, setMaxComponents] = useState<number>(0)
  const [voteBalance, setVoteBalance] = useState<number>(0)
  const [votes, setVotes] = useState<TokenVote[]>([])
  const [disableSubmit, setDisableSubmit] = useState<boolean>(true)
  const { account, library } = useEthers()

  useEffect(() => {}, [])

  return <Flex flexDirection='column' alignItems='center'></Flex>
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
