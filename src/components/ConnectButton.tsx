import { Button, Box, Text, useDisclosure } from '@chakra-ui/react'
import { ChainId, useEthers } from '@usedapp/core'
import { useState, useEffect } from 'react'
import Identicon from './Identicon'

import { ethersGetVotes } from 'apis/rebalanceExtension'
import ConnectModal from './ConnectModal'

const ConnectButton = (props: { handleOpenModal: any }) => {
  const { account } = useEthers()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleConnectWallet = () => {
    onOpen()
  }

  useEffect(() => {
    console.log(account)
  }, [account])

  return account ? (
    <Box
      display='flex'
      alignItems='center'
      background='gray.700'
      borderRadius='xl'
      py='0'
    >
      <ConnectToPolygon handleOpenModal={props.handleOpenModal} />
    </Box>
  ) : (
    <div>
      <Button
        onClick={handleConnectWallet}
        bg='blue.800'
        color='blue.300'
        fontSize='lg'
        fontWeight='medium'
        borderRadius='xl'
        border='1px solid transparent'
        _hover={{
          borderColor: 'blue.700',
          color: 'blue.400',
        }}
        _active={{
          backgroundColor: 'blue.800',
          borderColor: 'blue.700',
        }}
      >
        Connect to a wallet
      </Button>
      <ConnectModal isOpen={isOpen} onClose={onClose} />
    </div>
  )
}
export default ConnectButton

const ConnectToPolygon = (props: { handleOpenModal: any }) => {
  const [voteBalance, setVoteBalance] = useState<number>(0)
  const { chainId, account, library } = useEthers()

  useEffect(() => {
    if (account && library)
      ethersGetVotes(account, library).then((val) => {
        setVoteBalance(val)
      })
  }, [account, library])

  const addPolygon = () => {
    library?.send('wallet_addEthereumChain', [
      {
        chainId: '0x89',
        chainName: 'Polygon',
        nativeCurrency: {
          name: 'Matic',
          symbol: 'MATIC',
          decimals: 18,
        },
        rpcUrls: ['https://rpc-mainnet.maticvigil.com'],
        blockExplorerUrls: ['https://polygonscan.com/'],
      },
      account,
    ])
  }

  return chainId && chainId === ChainId.Polygon ? (
    <Box
      display='flex'
      alignItems='center'
      background='gray.700'
      borderRadius='xl'
      py='0'
    >
      <Box px='3'>
        <Text color='white' fontSize='md'>
          {voteBalance && voteBalance} votes
        </Text>
      </Box>
      <Button
        onClick={props.handleOpenModal}
        bg='gray.800'
        border='1px solid transparent'
        _hover={{
          border: '1px',
          borderStyle: 'solid',
          borderColor: 'blue.400',
          backgroundColor: 'gray.700',
        }}
        borderRadius='xl'
        m='1px'
        px={3}
        height='38px'
      >
        <Text color='white' fontSize='md' fontWeight='medium' mr='2'>
          {account &&
            `${account.slice(0, 6)}...${account.slice(
              account.length - 4,
              account.length
            )}`}
        </Text>
        <Identicon />
      </Button>
    </Box>
  ) : (
    <Button
      bg='red.800'
      color='red.300'
      fontSize='lg'
      fontWeight='medium'
      borderRadius='xl'
      border='1px solid transparent'
      onClick={() => addPolygon()}
    >
      Switch to Polygon
    </Button>
  )
}
