import { useEthers } from '@usedapp/core'
import { useEffect, useState } from 'react'

import { getHootComponents, SetComponent } from 'apis/hootTokenApi'
import TokenPercentTable from './TokenPercentTable'

const CompositionTable = () => {
  const { library } = useEthers()

  const [components, setComponents] = useState<SetComponent[]>([])

  useEffect(() => {
    getHootComponents(library)
      .then((data) => {
        setComponents(data)
      })
      .catch((err) => {
        console.error('getHootComponents ~ err', err)
      })
  }, [library])

  return <TokenPercentTable caption='Current Composition' tokens={components} />
}

export default CompositionTable
