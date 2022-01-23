import { Table, Tbody, Tr, Td, TableCaption, Flex } from '@chakra-ui/react'

import { SetComponent } from 'apis/hootTokenApi'

type TokenPercentTableProps = {
  caption: string
  tokens: SetComponent[]
}

const TokenPercentTable = ({ caption, tokens }: TokenPercentTableProps) => {
  return (
    <Flex direction='column' alignItems='center' mb='30px'>
      <Table colorScheme='whiteAlpha' size='lg'>
        <TableCaption placement='top' mt='0px'>
          {caption}
        </TableCaption>
        <Tbody>
          {tokens.map((token) => (
            <Tr>
              <Td>{token.name}</Td>
              <Td>{token.percentOfSet}%</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  )
}

export default TokenPercentTable
