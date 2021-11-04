import { Button, Box, Text } from '@chakra-ui/react'
import { ChainId, useEthers, useTokenBalance } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'

import Identicon from './Identicon'
import { OWL_NFT_ADDRESS } from 'utils/constants'

const ConnectButton = (props: { handleOpenModal: any }) => {
  const { account, activateBrowserWallet } = useEthers()

  const handleConnectWallet = () => {
    activateBrowserWallet()
  }

  return account ? (
    <Box
      display='flex'
      alignItems='center'
      background='gray.700'
      borderRadius='xl'
      py='0'
    >
      <ConnectToMatic handleOpenModal={props.handleOpenModal} />
    </Box>
  ) : (
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
  )
}
export default ConnectButton

const ConnectToMatic = (props: { handleOpenModal: any }) => {
  const { chainId, account } = useEthers()
  const nftBalance = useTokenBalance(OWL_NFT_ADDRESS, account)

  return chainId && chainId === ChainId.Kovan ? (
    <Box
      display='flex'
      alignItems='center'
      background='gray.700'
      borderRadius='xl'
      py='0'
    >
      <Box px='3'>
        <Text color='white' fontSize='md'>
          {nftBalance && parseFloat(formatEther(nftBalance)).toFixed(3)} Hoots
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
    >
      Switch to Matic
    </Button>
  )
}
