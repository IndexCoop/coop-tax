import { Box, Button, ListItem, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Autocomplete } from '@mui/material'
import { createFilterOptions } from '@mui/material/Autocomplete'

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
        console.log('Token Response', response)
        setTokens(response.data.tokens)
      })
  }, [])

  const handleOnSelect = (item: TokenData) => {
    let newSelected = selectedTokens.concat(item)
    setSelectedTokens(newSelected)
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
      <Autocomplete
        id='token-select'
        sx={{ width: 300 }}
        options={tokens}
        autoHighlight
        filterOptions={createFilterOptions({
          stringify(option) {
            return option.symbol + option.name
          },
          limit: 100,
        })}
        onChange={(_, value) => {
          if (value != null) handleOnSelect(value)
        }}
        getOptionLabel={(option) => option.name}
        renderOption={(props, option) => (
          <ListItem>
            <img loading='lazy' width='20' src={option.logoURI} alt='' />
            {option.name} ({option.symbol}) - {option.address}
          </ListItem>
        )}
        renderInput={(params) => (
          <Text
            {...params}
            label='Choose a token'
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
        )}
      />
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
