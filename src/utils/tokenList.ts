import { MaticTokens } from '@indexcoop/tokenlists'

import { Position } from 'apis/hootTokenApi'
import { VotedPosition } from 'apis/rebalanceExtension'

export const getTokenForPosition = (
  position: Position | VotedPosition,
  tokenList: TokenData[] = MaticTokens
): TokenData => {
  const matchingTokens = tokenList.filter(
    (t) => t.address.toLowerCase() === position.component.toLowerCase()
  )
  if (matchingTokens.length === 0) {
    console.warn(
      `No token for position ${position.component} exists in token lists`
    )
  } else if (matchingTokens.length > 1) {
    console.warn(
      `Multiple tokens for position ${position.component} exist in token lists`
    )
  }
  return matchingTokens[0]
}

export interface TokenData {
  chainId: number
  address: string
  name: string
  symbol: string
  decimals: number
  logoURI: string
}
