import {
  Box,
  Button,
  Input,
  ListItem,
  Icon,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete'
import {} from '@chakra-ui/react'

import { useMaxComponents, useVote } from 'hooks/votingContract'
import SelectedTokens from './SelectedTokens'
import { BigNumber } from '@ethersproject/bignumber'

const VoteList = () => {
  const [tokens, setTokens] = useState<TokenData[]>([])
  const [selectedTokens, setSelectedTokens] = useState<TokenData[]>([])
  const [votes, setVotes] = useState<TokenVote[]>([])

  useEffect(() => {
    axios
      .get('https://tokens.coingecko.com/uniswap/all.json')
      .then((response) => {
        console.log('Token Response', response.data.tokens)
        setTokens(response.data.tokens)
      })
  }, [])

  const handleOnSelect = (item: TokenData) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    if (selectedTokens.length < useMaxComponents()) {
      let newSelected = selectedTokens.concat(item)
      setSelectedTokens(newSelected)
    }
    console.log('selected', item, selectedTokens)
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
    <Box>
      <Stack direction='column'>
        <AutoComplete rollNavigation>
          <AutoCompleteInput
            variant='filled'
            placeholder='Search basic...'
            autoFocus
          />
          <AutoCompleteList>
            {tokens.map((option, oid) => (
              <AutoCompleteItem
                key={`option-${oid}`}
                value={option}
                label={option.name}
                textTransform='capitalize'
              >
                {option.symbol}
              </AutoCompleteItem>
            ))}
          </AutoCompleteList>
        </AutoComplete>
      </Stack>
      <SelectedTokens
        selectedTokens={selectedTokens}
        handleOnVote={handleOnVote}
        handleOnRemoveToken={handleOnRemoveToken}
      />
      <Button colorScheme='telegram' variant='solid' onClick={handleOnSubmit}>
        Give a Hoot
      </Button>
    </Box>
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
