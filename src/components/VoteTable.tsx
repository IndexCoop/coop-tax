import { useEthers } from '@usedapp/core'
import { useEffect, useState } from 'react'

import { getSubmittedVotes, RebalComponent } from 'apis/rebalanceExtension'
import TokenPercentTable from './TokenPercentTable'

const VoteTable = () => {
  const { library } = useEthers()

  const [components, rebalComponents] = useState<RebalComponent[]>([])

  useEffect(() => {
    getSubmittedVotes(library)
      .then((data) => {
        rebalComponents(data)
      })
      .catch((err) => {
        console.error('getSubmittedVotes ~ err', err)
      })
  }, [library])

  return (
    <TokenPercentTable
      tableType='votes'
      caption='Submitted votes for next rebalance'
      tokens={components}
    />
  )
}

export default VoteTable
