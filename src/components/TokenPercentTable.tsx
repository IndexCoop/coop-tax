import {
  Flex,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tr,
  Text,
  Tooltip,
} from '@chakra-ui/react'

import { SetComponent } from 'apis/hootTokenApi'
import { RebalComponent } from 'apis/rebalanceExtension'

type TokenPercentTableProps = {
  caption: string
  tokens: SetComponent[] | RebalComponent[]
  tableType: 'allocations' | 'votes'
}

const whichPercent = (token: SetComponent | RebalComponent): string => {
  let percent = ''
  if ('percentOfSet' in token) {
    percent = token.percentOfSet
  }
  if ('percentOfRebal' in token) {
    percent = token.percentOfRebal
  }
  return `${Number(percent).toFixed(0)}%`
}

const TokenPercentTable = ({
  caption,
  tokens,
  tableType,
}: TokenPercentTableProps) => {
  return (
    <Flex direction='column' alignItems='center' mb='30px'>
      <Table colorScheme='whiteAlpha' size='lg'>
        <TableCaption placement='top' mt='0px'>
          {caption}
        </TableCaption>
        <Tbody>
          {tokens.length === 0 && tableType === 'votes' && (
            <Tr>
              <Td>Be the first to vote on next week's rebalance!</Td>
            </Tr>
          )}
          {tokens.length > 0 &&
            tokens.map((token) => (
              <Tr>
                <Td>
                  <Tooltip label={token.address}>
                    <Text isTruncated maxWidth={120}>
                      {token.symbol || token.address}
                    </Text>
                  </Tooltip>
                </Td>
                <Td>{whichPercent(token)}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Flex>
  )
}

export default TokenPercentTable
