import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Flex,
} from '@chakra-ui/react'

const CompositionTable = () => {
  return (
    <Flex direction='column' alignItems='center'>
      <Table variant='simple'>
        <TableCaption>Composition Of the HOOT Index</TableCaption>
        <Thead>
          <Tr>
            <Th>Token</Th>
            <Th>Percentage</Th>
          </Tr>
        </Thead>
        <Tbody>
          {demoData.map((data) => (
            <Tr>
              <Td>{data.tokenName}</Td>
              <Td>{data.tokenPercentage}%</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  )
}

export default CompositionTable

/* Remove this commentline when the values & tokens will be fetched from the smart contract directly
 and the percentage of the token will be found */

/* export type props = {
  tokenName: String
  tokenPercentage: number
}
 */

/* This data has been declared for temporarily. Remove these when the original values will be fetched from the Smart Contract */
const demoData = [
  {
    tokenName: 'WETH',
    tokenPercentage: 22,
  },
  {
    tokenName: 'MATIC',
    tokenPercentage: 17,
  },
  {
    tokenName: 'DPI',
    tokenPercentage: 11,
  },
  {
    tokenName: 'AAVE',
    tokenPercentage: 8,
  },
]
