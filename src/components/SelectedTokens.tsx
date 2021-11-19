import {
  Box,
  Flex,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { CloseIcon } from '@chakra-ui/icons'
import { useEthers } from '@usedapp/core'

import { TokenData } from './VoteList'
import { ethersGetVotes } from 'apis/votingContract'

const SelectedTokens = (props: {
  selectedTokens: TokenData[]
  handleOnRemoveToken(token: TokenData): void
  handleOnVote(address: string, vote: number): void
}) => {
  const [voteBalance, setVoteBalance] = useState<number>(0)
  const { account, library } = useEthers()

  useEffect(() => {
    if (account && library)
      ethersGetVotes(account, library).then((val) => {
        setVoteBalance(val)
      })
  }, [account, library])

  return (
    <Box width='265px' marginBottom='13px'>
      {props.selectedTokens.map((token) => (
        <Flex
          flexDirection='row'
          alignItems='center'
          width='265px'
          justifyContent='flex-end'
          bg='gray.700'
          borderRadius='5px'
          padding='5px'
          marginBottom='10px'
        >
          <Text marginLeft='3px' flexGrow={99}>
            ${token.symbol}
          </Text>{' '}
          <Box paddingRight='10px'>
            <VoteCounter
              token={token}
              voteBalance={voteBalance}
              handleOnVote={props.handleOnVote}
            />
          </Box>
          <RemoveTokenButton
            token={token}
            handleOnRemoveToken={props.handleOnRemoveToken}
          />
        </Flex>
      ))}
    </Box>
  )
}

export default SelectedTokens

const RemoveTokenButton = (props: {
  token: TokenData
  handleOnRemoveToken(token: TokenData): void
}) => {
  return (
    <IconButton
      aria-label='Remove Token'
      bg='indianred'
      icon={<CloseIcon />}
      onClick={() => props.handleOnRemoveToken(props.token)}
    ></IconButton>
  )
}

const VoteCounter = (props: {
  token: TokenData
  voteBalance: number
  handleOnVote(address: string, vote: number): void
}) => {
  const vote = (vote: string) => {
    const voteInt = parseInt(vote)
    props.handleOnVote(props.token.address, voteInt)
  }

  return (
    <NumberInput
      defaultValue={0}
      min={0}
      max={props.voteBalance}
      width='80px'
      onChange={vote}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  )
}
