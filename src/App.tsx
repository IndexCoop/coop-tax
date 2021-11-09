import 'App.css'
import { ChakraProvider, useDisclosure } from '@chakra-ui/react'
import Layout from 'components/Layout'

import ConnectButton from 'components/ConnectButton'
import AccountModal from 'components/AccountModal'
import { TokenProvider } from 'providers/Token'
import VoteList from 'components/VoteList'
import { useEthers, useTokenBalance } from '@usedapp/core'
import { OWL_NFT_ADDRESS } from 'utils/constants'
import { useState } from 'react'

function App() {
  const [remainingVotes, setRemainingVotes] = useState<number>(0)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { chainId, account } = useEthers()
  const nftBalance = useTokenBalance(OWL_NFT_ADDRESS, account)
  return (
    <ChakraProvider>
      <TokenProvider>
        <Layout>
          <ConnectButton handleOpenModal={onOpen} />
          <AccountModal isOpen={isOpen} onClose={onClose} />
          {account && <VoteList />}
        </Layout>
      </TokenProvider>
    </ChakraProvider>
  )
}

export default App
