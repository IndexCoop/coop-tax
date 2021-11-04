import { useEffect, useState } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { createFilterOptions } from '@mui/material/Autocomplete'

import { useMaxComponents } from 'hooks/votingContract'

const VoteList = () => {
  const [tokens, setTokens] = useState<TokenData[]>([])
  const [selectedTokens, setSelectedTokens] = useState<TokenData[]>([])

  const removeToken = (token: TokenData) => {
    if (token)
      setSelectedTokens(
        selectedTokens.filter((selected) => selected.address !== token.address)
      )
  }

  const addToken = (token: TokenData) => {
    if (token) setSelectedTokens(selectedTokens.concat(token))
  }

  useEffect(() => {
    axios
      .get('https://tokens.coingecko.com/uniswap/all.json')
      .then((response) => {
        setTokens(response.data.tokens)
      })
  }, [])
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
          if (value != null) addToken(value)
        }}
        getOptionLabel={(option) => option.name}
        renderOption={(props, option) => (
          <Box
            component='li'
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...props}
            key={option.address}
          >
            <img loading='lazy' width='20' src={option.logoURI} alt='' />
            {option.name} ({option.symbol}) - {option.address}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Choose a token'
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
        )}
      />
    </Box>
  )
}

export default VoteList

interface TokenData {
  chainId: number
  address: string
  name: string
  symbol: string
  decimals: number
  logoURI: string
}
