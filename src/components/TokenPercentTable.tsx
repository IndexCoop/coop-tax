import { Table, Tbody, Tr, Td, TableCaption, Flex } from '@chakra-ui/react'

type TokenPercentTableProps = {
  caption: string
  tokens: { name: string; percent: number }[]
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
              <Td>{token.percent}%</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  )
}

export default TokenPercentTable
