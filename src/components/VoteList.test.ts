import { mapTokenDataToOption, uniqueSortedTokenList } from './VoteList'

const externalTokenList = [
  {
    name: 'MaticVerse',
    address: '0xFEb090FcD433dE479396E82DB8B83a470dbAD3c9',
    symbol: 'Mverse',
    decimals: 18,
    chainId: 137,
    logoURI:
      'https://assets.coingecko.com/coins/images/18403/small/A0782-F05-535-C-45-C8-BE4-F-FEBB4-B8-B5933.jpg?1631792934',
  },
  {
    name: 'Metaverse Index',
    address: '0xfe712251173A2cd5F5bE2B46Bb528328EA3565E1',
    symbol: 'MVI',
    decimals: 18,
    chainId: 137,
    logoURI:
      'https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/polygon/assets/0xfe712251173A2cd5F5bE2B46Bb528328EA3565E1/logo.png',
  },
  {
    name: 'Nexo',
    address: '0x41b3966B4FF7b427969ddf5da3627d6AEAE9a48E',
    symbol: 'NEXO',
    decimals: 18,
    chainId: 137,
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/200x200/2694.png',
  },
]

const ICTokenList = [
  {
    address: '0xfe712251173A2cd5F5bE2B46Bb528328EA3565E1',
    chainId: 137,
    decimals: 18,
    logoURI:
      'https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/polygon/assets/0xfe712251173A2cd5F5bE2B46Bb528328EA3565E1/logo.png',
    name: 'Metaverse Index',
    symbol: 'MVI',
  },
]

describe('mapTokenDataToOption', () => {
  it('should map raw TokenDatas to TokenOptions', () => {
    expect(mapTokenDataToOption(ICTokenList[0])).toStrictEqual({
      value: '0xfe712251173A2cd5F5bE2B46Bb528328EA3565E1',
      label: 'MVI',
      token: ICTokenList[0],
    })
  })
})

describe('uniqueSortedTokenList', () => {
  it('should return a token list that is unique by address and sorted by symbol', () => {
    expect(
      uniqueSortedTokenList([
        ...externalTokenList.map(mapTokenDataToOption),
        ...ICTokenList.map(mapTokenDataToOption),
      ])
    ).toStrictEqual(externalTokenList.map(mapTokenDataToOption))
  })
})
