import 'App.css'
import {
  ChakraProvider,
  Heading,
  Text,
  Flex,
  Image,
  useDisclosure,
} from '@chakra-ui/react'
import { useEthers } from '@usedapp/core'
import { Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Layout from 'components/Layout'
import ConnectButton from 'components/ConnectButton'
import AccountModal from 'components/AccountModal'
import VoteList from 'components/VoteList'
import TokenPurchase from 'components/TokenPurchase'

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { account } = useEthers()
  return (
    <ChakraProvider>
      <Layout>
        <Warning />
        <Heading m='20px 0'>coop.tax</Heading>
        <ConnectButton handleOpenModal={onOpen} />
        <AccountModal isOpen={isOpen} onClose={onClose} />
        {account && <AppContent />}
        <ToastContainer transition={Slide} position='bottom-left' />
      </Layout>
    </ChakraProvider>
  )
}

export default App

const Warning = () => {
  return (
    <Flex
      bg='#f4e42e'
      color='black'
      w='90vw'
      textAlign='center'
      p='30px'
      borderRadius='10px'
      direction='row'
      justifyContent='space-between'
      alignItems='center'
    >
      <Image
        boxSize='50px'
        src='https://emojipedia-us.s3.amazonaws.com/source/skype/289/monkey_1f412.png'
        ml='20px'
      />
      <Text fontSize='xl'>
        <Text color='red' fontWeight='bold'>
          this is an experiment
        </Text>{' '}
        assume any money used here is as good as rugged
      </Text>
      <Image
        boxSize='50px'
        src='https://emojipedia-us.s3.amazonaws.com/source/skype/289/monkey_1f412.png'
        mr='20px'
      />
    </Flex>
  )
}

const AppContent = () => {
  return (
    <Flex flexDir='row' justifyContent='space-evenly' w='100vw' mt='30px'>
      <TokenPurchase />
      <VoteList />
    </Flex>
  )
}
