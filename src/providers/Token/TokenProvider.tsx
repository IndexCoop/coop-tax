import React, { useState } from 'react'
import TokenContext, { defaultToken } from './TokenContext'
import { TokenData } from './types'

const TokenProvider: React.FC = ({ children }) => {
  const [selectedToken, setSelectedToken] = useState<TokenData>(defaultToken)

  return (
    <TokenContext.Provider
      value={{
        selectedToken,
        setSelectedToken,
      }}
    >
      {children}
    </TokenContext.Provider>
  )
}

export default TokenProvider
