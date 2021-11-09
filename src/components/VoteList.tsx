import { Box, Button, Flex } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import {} from '@chakra-ui/react'

import { useMaxComponents, useVote } from 'hooks/votingContract'
import SelectedTokens from './SelectedTokens'
import { BigNumber } from '@ethersproject/bignumber'
import Select, { createFilter } from 'react-select'
import { useEthers } from '@usedapp/core'

const VoteList = () => {
  const [tokenOptions, setTokenOptions] = useState<TokenOption[]>([])
  const [selectedTokens, setSelectedTokens] = useState<TokenData[]>([])
  const [votes, setVotes] = useState<TokenVote[]>([])
  const maxComponents = useMaxComponents()

  useEffect(() => {
    axios
      .get(
        'https://unpkg.com/quickswap-default-token-list@1.2.4/build/quickswap-default.tokenlist.json'
      )
      .then((response) => {
        console.log('Token Response', response.data.tokens)
        setTokenOptions(
          response.data.tokens.map((token: TokenData) => {
            return { value: token.address, label: token.symbol, token: token }
          })
        )
      })
  }, [])

  const handleOnSelect = (item: TokenData) => {
    if (selectedTokens.length < maxComponents) {
      console.log(
        'length < maxComponents',
        selectedTokens.length,
        maxComponents
      )
      let newSelected = selectedTokens.concat(item)
      console.log('newSelected', newSelected)
      setSelectedTokens(newSelected)
      console.log('selected', item, selectedTokens)
    }
  }

  const handleOnRemoveToken = (removedToken: TokenData) => {
    const remainingSelected = selectedTokens.filter(
      (token) => token !== removedToken
    )
    const remainingVotes = votes.filter(
      (vote) => vote.address !== removedToken.address
    )
    setSelectedTokens(remainingSelected)
    setVotes(remainingVotes)
    console.log('removed', removedToken, remainingVotes, remainingSelected)
  }

  const handleOnVote = (address: string, tokenVotes: number) => {
    const vote: TokenVote = { address: address, votes: tokenVotes }
    setVotes(votes.concat(vote))
    console.log('voted', vote, votes)
  }

  const handleOnSubmit = () => {
    const addresses = votes.map((vote) => vote.address)
    const finalVotes = votes.map((vote) => BigNumber.from(vote.votes))
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useVote(addresses, finalVotes)
    console.log('voted', addresses, finalVotes)
  }

  return (
    <Flex flexDirection='column' alignItems='center'>
      <Select
        isSearchable
        name='color'
        options={tokenOptions}
        filterOption={createFilter({ ignoreAccents: false })}
        onChange={(value) => {
          if (value !== null) handleOnSelect(value.token)
        }}
        className='token-select'
      />
      <SelectedTokens
        selectedTokens={selectedTokens}
        handleOnVote={handleOnVote}
        handleOnRemoveToken={handleOnRemoveToken}
      />
      <Button
        width='20vw'
        colorScheme='telegram'
        variant='solid'
        onClick={handleOnSubmit}
      >
        Give a Hoot
      </Button>
    </Flex>
  )
}

export default VoteList

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
