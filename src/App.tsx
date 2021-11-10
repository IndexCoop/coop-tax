import 'App.css'
import { ChakraProvider, useDisclosure } from '@chakra-ui/react'
import { useEthers } from '@usedapp/core'

import Layout from 'components/Layout'
import ConnectButton from 'components/ConnectButton'
import AccountModal from 'components/AccountModal'
import VoteList from 'components/VoteList'

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { account } = useEthers()
  return (
    <ChakraProvider>
      <Layout>
        <ConnectButton handleOpenModal={onOpen} />
        <AccountModal isOpen={isOpen} onClose={onClose} />
        {account && <VoteList />}
      </Layout>
    </ChakraProvider>
  )
}

export default App
