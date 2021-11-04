import 'App.css'
import { ChakraProvider, useDisclosure } from '@chakra-ui/react'
import Layout from 'components/Layout'

import ConnectButton from 'components/ConnectButton'
import AccountModal from 'components/AccountModal'
import { TokenProvider } from 'providers/Token'
import VoteList from 'components/VoteList'

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <ChakraProvider>
      <TokenProvider>
        <Layout>
          <ConnectButton handleOpenModal={onOpen} />
          <AccountModal isOpen={isOpen} onClose={onClose} />
          <VoteList />
        </Layout>
      </TokenProvider>
    </ChakraProvider>
  )
}

export default App
