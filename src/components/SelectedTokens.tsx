import { Box, ListItem, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { TokenData } from 'providers/Token'

const SelectedTokens = (props: {
  selectedTokens: TokenData[]
  handleOnRemoveToken(token: TokenData): void
  handleOnVote(address: string, vote: number): void
}) => {
  useEffect(() => {}, [])

  return (
    <Box>
      {props.selectedTokens.map((token) => (
        <ListItem>
          <img loading='lazy' width='20' src={token.logoURI} alt='' />
          {token.name} ({token.symbol})<Text> Voting here</Text>
        </ListItem>
      ))}
    </Box>
  )
}

export default SelectedTokens
