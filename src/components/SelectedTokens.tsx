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
import { TokenData } from 'providers/Token'
import { CloseIcon } from '@chakra-ui/icons'
import { useEthers, useTokenBalance } from '@usedapp/core'
import { OWL_NFT_ADDRESS } from 'utils/constants'
import { useGetVotes } from 'hooks/nftContract'

const SelectedTokens = (props: {
  selectedTokens: TokenData[]
  handleOnRemoveToken(token: TokenData): void
  handleOnVote(address: string, vote: number): void
}) => {
  const [remainingVotes, setRemainingVotes] = useState<number>(0)
  const { chainId, account } = useEthers()
  const nftBalance = useTokenBalance(OWL_NFT_ADDRESS, account)
  setRemainingVotes(
    useGetVotes(account ? account : '', nftBalance ? nftBalance.toNumber() : 0)
  )
  useEffect(() => {}, [])
  console.log('SelectedTokens', props.selectedTokens)

  return (
    <Box width='35vw' marginBottom='10px'>
      {props.selectedTokens.length > 0 ? (
        props.selectedTokens.map((token) => (
          <Flex
            flexDirection='row'
            alignItems='center'
            width='35vw'
            justifyContent='space-between'
            bg='gray.700'
            borderRadius='5px'
            padding='5px'
          >
            <Text marginLeft='3px'>${token.symbol}</Text>{' '}
            <Text> Voting here</Text>
            <RemoveTokenButton
              token={token}
              handleOnRemoveToken={props.handleOnRemoveToken}
            />
          </Flex>
        ))
      ) : (
        <Box width='35vw' textAlign='center'>
          No Selected Tokens
        </Box>
      )}
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
  handleOnVote(address: string, vote: number): void
}) => {
  return (
    <NumberInput defaultValue={15} min={10} max={20}>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  )
}
