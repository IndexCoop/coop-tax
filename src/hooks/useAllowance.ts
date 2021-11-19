import { useEthers } from '@usedapp/core'
import { BigNumber } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { useCallback, useEffect, useState } from 'react'
import { getAllowance } from 'utils'

const useAllowance = (tokenAddress?: string, spenderAddress?: string) => {
  const [allowance, setAllowance] = useState<BigNumber>()
  const { account, library } = useEthers()

  const fetchAllowance = useCallback(
    async (userAddress: string, provider: Provider) => {
      if (!spenderAddress || !tokenAddress) {
        return
      }

      const allowance = await getAllowance(
        userAddress,
        spenderAddress,
        tokenAddress,
        provider
      )

      setAllowance(allowance)
    },
    [setAllowance, spenderAddress, tokenAddress]
  )

  useEffect(() => {
    if (!account || !library || !spenderAddress || !tokenAddress) {
      return
    }

    fetchAllowance(account, library)

    let refreshInterval = setInterval(
      () => fetchAllowance(account, library),
      10000
    )

    return () => clearInterval(refreshInterval)
  }, [account, library, spenderAddress, tokenAddress, fetchAllowance])

  return allowance
}

export default useAllowance
