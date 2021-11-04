import React, { createContext } from 'react'
import { TokenData } from './types'

interface TokenContextValues {
  selectedToken: TokenData
  setSelectedToken: React.Dispatch<React.SetStateAction<TokenData>>
}

export const defaultToken: TokenData = {
  chainId: 1,
  address: '0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e',
  name: 'yearn finance',
  symbol: 'YFI',
  decimals: 18,
  logoURI:
    'https://assets.coingecko.com/coins/images/11849/thumb/yfi-192x192.png?1598325330',
}

const TokenContext = createContext<TokenContextValues>({
  selectedToken: defaultToken,
  setSelectedToken: () => null,
})

export default TokenContext
