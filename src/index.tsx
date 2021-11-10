import React from 'react'
import ReactDOM from 'react-dom'
import { ChainId, DAppProvider } from '@usedapp/core'

import 'index.css'
import App from './App'

const config = {
  readOnlyChainId: ChainId.Polygon,
  readOnlyUrls: {
    [ChainId.Polygon]: 'https://polygon-rpc.com',
  },
}

// const kovanConfig = {
//   readOnlyChainId: ChainId.Kovan,
//   readOnlyUrls: {
//     [ChainId.Kovan]:
//       'https://kovan.infura.io/v3/a5afec4445a3489da6bdda32a7e7d81c',
//   },
// }

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
