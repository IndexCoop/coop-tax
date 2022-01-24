import BigNumber from 'bignumber.js'

export const TEN_POW_18 = new BigNumber(10).pow(18)

/** Contract Addresses */
export const OWL_NFT_ADDRESS =
  process.env.REACT_APP_OWL_NFT_ADDRESS ||
  '0x79906bE7d10C2CB97793a4Ebd87bd3D52ceda412'
export const APE_REBALANCE_EXT_ADDRESS =
  process.env.REACT_APP_APE_REBALANCE_EXT_ADDRESS ||
  '0x9cB703Cf5D0a6bbBf13f04FA5A5E2AF087FDda47'
export const POLYGON_EXCHANGE_ISSUANCE =
  process.env.REACT_APP_POLYGON_EXCHANGE_ISSUANCE ||
  '0x0dC65c883fccC9CAcb34650588C196CcC6D4e762'
export const WETH_ADDRESS =
  process.env.REACT_APP_WETH_ADDRESS ||
  '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619'
export const DAI_ADDRESS =
  process.env.REACT_APP_DAI_ADDRESS ||
  '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063'
export const HOOT_SET_TOKEN_ADDRESS =
  process.env.REACT_APP_HOOT_SET_TOKEN_ADDRESS ||
  '0xf282dd7e23d8db89671b70cd3f0ecb1f957a2be0'

/** API KEYS **/
export const ALCHEMY_KEY = process.env.REACT_APP_ALCHEMY_KEY

/** ABIs */
export const OWL_NFT_ABI = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'approved',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      { indexed: false, internalType: 'bool', name: 'approved', type: 'bool' },
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'baseURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address[]', name: '_to', type: 'address[]' },
      {
        internalType: 'enum OwlNFT.OwlRank[]',
        name: '_ranks',
        type: 'uint8[]',
      },
    ],
    name: 'batchMint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_id', type: 'uint256' }],
    name: 'getVotes',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'operator', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { internalType: 'bytes', name: '_data', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'operator', type: 'address' },
      { internalType: 'bool', name: 'approved', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'uint256', name: 'index', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
export const APE_REBALANCE_EXT_ABI = [
  {
    inputs: [
      {
        internalType: 'contract IBaseManager',
        name: '_manager',
        type: 'address',
      },
      {
        internalType: 'contract IGeneralIndexModule',
        name: '_gim',
        type: 'address',
      },
      { internalType: 'contract OwlNFT', name: '_owlNft', type: 'address' },
      {
        internalType: 'contract IUniswapV2Router',
        name: '_sushiRouter',
        type: 'address',
      },
      {
        internalType: 'contract IUniswapV2Router',
        name: '_quickRouter',
        type: 'address',
      },
      { internalType: 'contract IERC20', name: '_weth', type: 'address' },
      { internalType: 'uint256', name: '_minWethLiquidity', type: 'uint256' },
      { internalType: 'uint256', name: '_startTime', type: 'uint256' },
      { internalType: 'uint256', name: '_epochLength', type: 'uint256' },
      { internalType: 'uint256', name: '_maxComponents', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bool', name: '_status', type: 'bool' },
    ],
    name: 'AnyoneCallableUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_caller',
        type: 'address',
      },
      { indexed: false, internalType: 'bool', name: '_status', type: 'bool' },
    ],
    name: 'CallerStatusUpdated',
    type: 'event',
  },
  {
    inputs: [],
    name: 'anyoneCallable',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'callAllowList',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'currentEpochStart',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'epochLength',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'generalIndexModule',
    outputs: [
      {
        internalType: 'contract IGeneralIndexModule',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getRebalancePrices',
    outputs: [
      { internalType: 'address[]', name: 'components', type: 'address[]' },
      { internalType: 'uint256[]', name: 'prices', type: 'uint256[]' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getSetValue',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_voter', type: 'address' }],
    name: 'getVotes',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getWeights',
    outputs: [
      { internalType: 'address[]', name: '', type: 'address[]' },
      { internalType: 'uint256[]', name: '', type: 'uint256[]' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_token', type: 'address' }],
    name: 'isTokenLiquid',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'lastEpochVoted',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'manager',
    outputs: [
      { internalType: 'contract IBaseManager', name: '', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxComponents',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'minWethLiquidity',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owlNft',
    outputs: [{ internalType: 'contract OwlNFT', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'possibleComponents',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'quickRouter',
    outputs: [
      { internalType: 'contract IUniswapV2Router', name: '', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bool', name: '_status', type: 'bool' }],
    name: 'setAnyoneTrade',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address[]', name: '_components', type: 'address[]' },
      { internalType: 'uint256[]', name: '_coolOffPeriods', type: 'uint256[]' },
    ],
    name: 'setCoolOffPeriods',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address[]', name: '_components', type: 'address[]' },
      { internalType: 'bytes[]', name: '_exchangeData', type: 'bytes[]' },
    ],
    name: 'setExchangeData',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address[]', name: '_components', type: 'address[]' },
      { internalType: 'string[]', name: '_exchangeNames', type: 'string[]' },
    ],
    name: 'setExchanges',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_newMin', type: 'uint256' }],
    name: 'setMinWethLiquidity',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_raiseTargetPercentage',
        type: 'uint256',
      },
    ],
    name: 'setRaiseTargetPercentage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'setToken',
    outputs: [
      { internalType: 'contract ISetToken_1', name: '', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address[]', name: '_components', type: 'address[]' },
      { internalType: 'uint256[]', name: '_tradeMaximums', type: 'uint256[]' },
    ],
    name: 'setTradeMaximums',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address[]', name: '_traders', type: 'address[]' },
      { internalType: 'bool[]', name: '_statuses', type: 'bool[]' },
    ],
    name: 'setTraderStatus',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_setValue', type: 'uint256' },
      { internalType: 'address[]', name: '_components', type: 'address[]' },
      {
        internalType: 'uint256[]',
        name: '_componentPrices',
        type: 'uint256[]',
      },
    ],
    name: 'startRebalance',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address[]', name: '', type: 'address[]' },
      { internalType: 'uint256[]', name: '', type: 'uint256[]' },
      { internalType: 'uint256', name: '', type: 'uint256' },
    ],
    name: 'startRebalanceWithUnits',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'sushiRouter',
    outputs: [
      { internalType: 'contract IUniswapV2Router', name: '', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bool', name: '_status', type: 'bool' }],
    name: 'updateAnyoneCallable',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address[]', name: '_callers', type: 'address[]' },
      { internalType: 'bool[]', name: '_statuses', type: 'bool[]' },
    ],
    name: 'updateCallerStatus',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address[]', name: '_components', type: 'address[]' },
      { internalType: 'uint256[]', name: '_votes', type: 'uint256[]' },
    ],
    name: 'vote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'votes',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
]
export const POLYGON_EXCHANGE_ISSUANCE_ABI = [
  {
    inputs: [
      { internalType: 'address', name: '_weth', type: 'address' },
      { internalType: 'address', name: '_uniFactory', type: 'address' },
      {
        internalType: 'contract IUniswapV2Router02',
        name: '_uniRouter',
        type: 'address',
      },
      { internalType: 'address', name: '_sushiFactory', type: 'address' },
      {
        internalType: 'contract IUniswapV2Router02',
        name: '_sushiRouter',
        type: 'address',
      },
      {
        internalType: 'contract IController',
        name: '_setController',
        type: 'address',
      },
      {
        internalType: 'contract IBasicIssuanceModule',
        name: '_basicIssuanceModule',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_recipient',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'contract ISetToken',
        name: '_setToken',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'contract IERC20',
        name: '_inputToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amountInputToken',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amountSetIssued',
        type: 'uint256',
      },
    ],
    name: 'ExchangeIssue',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_recipient',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'contract ISetToken',
        name: '_setToken',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'contract IERC20',
        name: '_outputToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amountSetRedeemed',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amountOutputToken',
        type: 'uint256',
      },
    ],
    name: 'ExchangeRedeem',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_refundAmount',
        type: 'uint256',
      },
    ],
    name: 'Refund',
    type: 'event',
  },
  {
    inputs: [],
    name: 'ETH_ADDRESS',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'WETH',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract ISetToken',
        name: '_setToken',
        type: 'address',
      },
    ],
    name: 'approveSetToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'contract IERC20', name: '_token', type: 'address' },
    ],
    name: 'approveToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'contract IERC20[]', name: '_tokens', type: 'address[]' },
    ],
    name: 'approveTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'basicIssuanceModule',
    outputs: [
      {
        internalType: 'contract IBasicIssuanceModule',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract ISetToken',
        name: '_setToken',
        type: 'address',
      },
      { internalType: 'contract IERC20', name: '_inputToken', type: 'address' },
      { internalType: 'uint256', name: '_amountSetToken', type: 'uint256' },
    ],
    name: 'getAmountInToIssueExactSet',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract ISetToken',
        name: '_setToken',
        type: 'address',
      },
      { internalType: 'address', name: '_outputToken', type: 'address' },
      { internalType: 'uint256', name: '_amountSetToken', type: 'uint256' },
    ],
    name: 'getAmountOutOnRedeemSet',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract ISetToken',
        name: '_setToken',
        type: 'address',
      },
      { internalType: 'contract IERC20', name: '_inputToken', type: 'address' },
      { internalType: 'uint256', name: '_amountInput', type: 'uint256' },
    ],
    name: 'getEstimatedIssueSetAmount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract ISetToken',
        name: '_setToken',
        type: 'address',
      },
      { internalType: 'uint256', name: '_amountSetToken', type: 'uint256' },
    ],
    name: 'issueExactSetFromETH',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract ISetToken',
        name: '_setToken',
        type: 'address',
      },
      { internalType: 'contract IERC20', name: '_inputToken', type: 'address' },
      { internalType: 'uint256', name: '_amountSetToken', type: 'uint256' },
      {
        internalType: 'uint256',
        name: '_maxAmountInputToken',
        type: 'uint256',
      },
    ],
    name: 'issueExactSetFromToken',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract ISetToken',
        name: '_setToken',
        type: 'address',
      },
      { internalType: 'uint256', name: '_minSetReceive', type: 'uint256' },
    ],
    name: 'issueSetForExactETH',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract ISetToken',
        name: '_setToken',
        type: 'address',
      },
      { internalType: 'contract IERC20', name: '_inputToken', type: 'address' },
      { internalType: 'uint256', name: '_amountInput', type: 'uint256' },
      { internalType: 'uint256', name: '_minSetReceive', type: 'uint256' },
    ],
    name: 'issueSetForExactToken',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract ISetToken',
        name: '_setToken',
        type: 'address',
      },
      { internalType: 'uint256', name: '_amountSetToken', type: 'uint256' },
      { internalType: 'uint256', name: '_minEthOut', type: 'uint256' },
    ],
    name: 'redeemExactSetForETH',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract ISetToken',
        name: '_setToken',
        type: 'address',
      },
      {
        internalType: 'contract IERC20',
        name: '_outputToken',
        type: 'address',
      },
      { internalType: 'uint256', name: '_amountSetToken', type: 'uint256' },
      { internalType: 'uint256', name: '_minOutputReceive', type: 'uint256' },
    ],
    name: 'redeemExactSetForToken',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'setController',
    outputs: [
      { internalType: 'contract IController', name: '', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'sushiFactory',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'sushiRouter',
    outputs: [
      {
        internalType: 'contract IUniswapV2Router02',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'uniFactory',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'uniRouter',
    outputs: [
      {
        internalType: 'contract IUniswapV2Router02',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  { stateMutability: 'payable', type: 'receive' },
]
export const ERC20_ABI = [
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_spender',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_from',
        type: 'address',
      },
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        name: '',
        type: 'uint8',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
      {
        name: '_spender',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    payable: true,
    stateMutability: 'payable',
    type: 'fallback',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
]
export const SET_TOKEN_ABI = [
  {
    inputs: [
      { internalType: 'address[]', name: '_components', type: 'address[]' },
      { internalType: 'int256[]', name: '_units', type: 'int256[]' },
      { internalType: 'address[]', name: '_modules', type: 'address[]' },
      {
        internalType: 'contract IController',
        name: '_controller',
        type: 'address',
      },
      { internalType: 'address', name: '_manager', type: 'address' },
      { internalType: 'string', name: '_name', type: 'string' },
      { internalType: 'string', name: '_symbol', type: 'string' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_component',
        type: 'address',
      },
    ],
    name: 'ComponentAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_component',
        type: 'address',
      },
    ],
    name: 'ComponentRemoved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_component',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: '_realUnit',
        type: 'int256',
      },
    ],
    name: 'DefaultPositionUnitEdited',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_component',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_positionModule',
        type: 'address',
      },
      { indexed: false, internalType: 'bytes', name: '_data', type: 'bytes' },
    ],
    name: 'ExternalPositionDataEdited',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_component',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_positionModule',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: '_realUnit',
        type: 'int256',
      },
    ],
    name: 'ExternalPositionUnitEdited',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_target',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: '_value',
        type: 'uint256',
      },
      { indexed: false, internalType: 'bytes', name: '_data', type: 'bytes' },
      {
        indexed: false,
        internalType: 'bytes',
        name: '_returnValue',
        type: 'bytes',
      },
    ],
    name: 'Invoked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_newManager',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_oldManager',
        type: 'address',
      },
    ],
    name: 'ManagerEdited',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_module',
        type: 'address',
      },
    ],
    name: 'ModuleAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_module',
        type: 'address',
      },
    ],
    name: 'ModuleInitialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_module',
        type: 'address',
      },
    ],
    name: 'ModuleRemoved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_module',
        type: 'address',
      },
    ],
    name: 'PendingModuleRemoved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_component',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_positionModule',
        type: 'address',
      },
    ],
    name: 'PositionModuleAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_component',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_positionModule',
        type: 'address',
      },
    ],
    name: 'PositionModuleRemoved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'int256',
        name: '_newMultiplier',
        type: 'int256',
      },
    ],
    name: 'PositionMultiplierEdited',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [{ internalType: 'address', name: '_component', type: 'address' }],
    name: 'addComponent',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_component', type: 'address' },
      { internalType: 'address', name: '_positionModule', type: 'address' },
    ],
    name: 'addExternalPositionModule',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_module', type: 'address' }],
    name: 'addModule',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_account', type: 'address' },
      { internalType: 'uint256', name: '_quantity', type: 'uint256' },
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'components',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'controller',
    outputs: [
      { internalType: 'contract IController', name: '', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'subtractedValue', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_component', type: 'address' },
      { internalType: 'int256', name: '_realUnit', type: 'int256' },
    ],
    name: 'editDefaultPositionUnit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_component', type: 'address' },
      { internalType: 'address', name: '_positionModule', type: 'address' },
      { internalType: 'bytes', name: '_data', type: 'bytes' },
    ],
    name: 'editExternalPositionData',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_component', type: 'address' },
      { internalType: 'address', name: '_positionModule', type: 'address' },
      { internalType: 'int256', name: '_realUnit', type: 'int256' },
    ],
    name: 'editExternalPositionUnit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'int256', name: '_newMultiplier', type: 'int256' },
    ],
    name: 'editPositionMultiplier',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getComponents',
    outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_component', type: 'address' }],
    name: 'getDefaultPositionRealUnit',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_component', type: 'address' },
      { internalType: 'address', name: '_positionModule', type: 'address' },
    ],
    name: 'getExternalPositionData',
    outputs: [{ internalType: 'bytes', name: '', type: 'bytes' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_component', type: 'address' }],
    name: 'getExternalPositionModules',
    outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_component', type: 'address' },
      { internalType: 'address', name: '_positionModule', type: 'address' },
    ],
    name: 'getExternalPositionRealUnit',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getModules',
    outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getPositions',
    outputs: [
      {
        components: [
          { internalType: 'address', name: 'component', type: 'address' },
          { internalType: 'address', name: 'module', type: 'address' },
          { internalType: 'int256', name: 'unit', type: 'int256' },
          { internalType: 'uint8', name: 'positionState', type: 'uint8' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        internalType: 'struct ISetToken.Position[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_component', type: 'address' }],
    name: 'getTotalComponentRealUnits',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'addedValue', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'initializeModule',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_target', type: 'address' },
      { internalType: 'uint256', name: '_value', type: 'uint256' },
      { internalType: 'bytes', name: '_data', type: 'bytes' },
    ],
    name: 'invoke',
    outputs: [{ internalType: 'bytes', name: '_returnValue', type: 'bytes' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_component', type: 'address' }],
    name: 'isComponent',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_component', type: 'address' },
      { internalType: 'address', name: '_module', type: 'address' },
    ],
    name: 'isExternalPositionModule',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_module', type: 'address' }],
    name: 'isInitializedModule',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isLocked',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_module', type: 'address' }],
    name: 'isPendingModule',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'lock',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'locker',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'manager',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_account', type: 'address' },
      { internalType: 'uint256', name: '_quantity', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'moduleStates',
    outputs: [
      { internalType: 'enum ISetToken.ModuleState', name: '', type: 'uint8' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'modules',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'positionMultiplier',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_component', type: 'address' }],
    name: 'removeComponent',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_component', type: 'address' },
      { internalType: 'address', name: '_positionModule', type: 'address' },
    ],
    name: 'removeExternalPositionModule',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_module', type: 'address' }],
    name: 'removeModule',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_module', type: 'address' }],
    name: 'removePendingModule',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_manager', type: 'address' }],
    name: 'setManager',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'sender', type: 'address' },
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'unlock',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  { stateMutability: 'payable', type: 'receive' },
]
