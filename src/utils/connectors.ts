export type ChainData = {
  name: string
  chainId: number
  rpcUrl: string
  icon: string
  coingeckoId: string
}

export const POLYGON_CHAIN_DATA: ChainData = {
  name: 'Polygon',
  chainId: 137,
  rpcUrl: 'https://rpc-mainnet.maticvigil.com/',
  icon: 'https://raw.githubusercontent.com/sushiswap/icons/master/network/polygon.jpg',
  coingeckoId: 'polygon-pos',
}
