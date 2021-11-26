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
  ethersIsTokenLiquid,
} from 'apis/rebalanceExtension'
import SelectedTokens from './SelectedTokens'
import { fromWei, toWei } from 'utils'

const VoteList = () => {
  const [tokenOptions, setTokenOptions] = useState<TokenOption[]>([])
  const [selectedTokens, setSelectedTokens] = useState<TokenData[]>([])
  const [maxComponents, setMaxComponents] = useState<number>(0)
  const [voteBalance, setVoteBalance] = useState<number>(0)
  const [votes, setVotes] = useState<TokenVote[]>([])
  const [disableSubmit, setDisableSubmit] = useState<boolean>(true)
  const { account, library } = useEthers()

  useEffect(() => {
    axios
      .get(
        'https://unpkg.com/quickswap-default-token-list@1.2.4/build/quickswap-default.tokenlist.json'
      )
      .then((response) => {
        setTokenOptions(
          response.data.tokens.map((token: TokenData) => {
            return { value: token.address, label: token.symbol, token: token }
          })
        )
      })
    ethersGetVotes(account, library).then((val) => {
      setVoteBalance(val)
      if (val === 0) setDisableSubmit(true)
    })
    ethersGetMaxComponents(library).then((val) => {
      setMaxComponents(val)
    })
  }, [account, library, maxComponents, voteBalance])

  const handleOnSelect = async (item: TokenData) => {
    const isTokenLiquid = await ethersIsTokenLiquid(library, item.address)
    if (isTokenLiquid) {
      if (selectedTokens.length < maxComponents) {
        setDisableSubmit(false)
        if (selectedTokens.indexOf(item) === -1) {
          let newSelected = selectedTokens.concat(item)
          setSelectedTokens(newSelected)
        }
      } else {
        toast.warn(`cannot have more than ${maxComponents} tokens selected`, {
          autoClose: 4000,
        })
      }
    } else {
      toast.error('the selected token is illiquid and cant be used', {
        toastId: 'couldnt-buy',
        autoClose: 4000,
      })
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
    if (remainingSelected.length === 0) setDisableSubmit(true)
  }

  const handleOnVote = (address: string, tokenVotes: number) => {
    const newVote: TokenVote = { address: address, votes: tokenVotes }
    const existingVote = votes.filter((vote) => {
      return vote.address === address
    })
    if (existingVote.length > 0) {
      const voteIndex = votes.indexOf(existingVote[0])
      let updateVotes = votes
      updateVotes[voteIndex] = newVote
      setVotes(updateVotes)
    } else {
      setVotes(votes.concat(newVote))
    }
  }

  const totalVotes = (finalVotes: BigNumber[]) => {
    return finalVotes.reduce((tally: BigNumber, votes: BigNumber) =>
      tally.add(votes)
    )
  }

  const handleOnSubmit = () => {
    const addresses = votes.map((vote) => vote.address)
    const finalVotes = votes.map((vote) => toWei(vote.votes))
    const voteTally = totalVotes(finalVotes)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    if (addresses.length === 0 || finalVotes.length === 0)
      toast.error(`you must select tokens to vote on before submitting`, {
        autoClose: 4000,
      })
    else if (
      voteTally.lte(toWei(voteBalance)) &&
      !disableSubmit
    )
      ethersVote(library, addresses, finalVotes)
    else
      toast.error(
        `you only have ${voteBalance} hoots to give, but you tried to give ${fromWei(
          voteTally
        ).toString()}`,
        {
          autoClose: 4000,
        }
      )
    setDisableSubmit(true)
  }

  const votingEnabled = () => {
    return (
      <Flex flexDirection='column' alignItems='center'>
        <Text fontSize='xs'>
          use your votes to vote on tokens to include in the next weekly
          rebalance
        </Text>
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
        <Text mb='10px'>
          selected {selectedTokens.length}/{maxComponents} tokens
        </Text>
        <SelectedTokens
          selectedTokens={selectedTokens}
          handleOnVote={handleOnVote}
          handleOnRemoveToken={handleOnRemoveToken}
        />
        <Button
          width='150px'
          colorScheme='telegram'
          variant='solid'
          disabled={disableSubmit}
          onClick={handleOnSubmit}
        >
          give a hoot
        </Button>
      </Flex>
    )
  }

  const votingDisabled = () => {
    return (
      <Flex flexDirection='column' alignItems='center'>
        <Text>nah fam get rekt, you're not allowed to vote</Text>
      </Flex>
    )
  }

  return <div>{false ? votingDisabled() : votingEnabled()}</div>
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
