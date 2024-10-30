import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  useColorModeValue
} from '@chakra-ui/react'
import PropTypes from 'prop-types'

const TableInfo = ({ data, edit, remove, primaryKey, title }) => {
  const headerBgColor = useColorModeValue('blue.500', 'blue.700')
  const headerColor = useColorModeValue('white', 'white')
  const rowHoverColor = useColorModeValue('gray.100', 'gray.600')
  const rowBgColor = useColorModeValue('white', 'gray.800')

  const headers = data.length > 0 ? Object.keys(data[0]) : []

  return (
    <TableContainer boxShadow='md' borderRadius='md'>
      <Table variant='simple' size='sm'>
        <TableCaption>{title}</TableCaption>
        <Thead backgroundColor={headerColor}>
          <Tr backgroundColor={headerBgColor}>
            {headers.map((header) => (
              <Th key={header} isNumeric={typeof data[0][header] === 'number'}>
                {header}
              </Th>
            ))}
            {(edit || remove) && <Th>Actions</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, rowIndex) => (
            <Tr key={row[primaryKey] || rowIndex} _hover={{ backgroundColor: rowHoverColor }} backgroundColor={rowIndex % 2 === 0 ? rowBgColor : 'transparent'}>
              {headers.map((header) => (
                <Td key={header} isNumeric={typeof row[header] === 'number'}>
                  {row[header]}
                </Td>
              ))}
              {(edit || remove) && (
                <Td>
                  {edit && (
                    <Button
                      colorScheme='blue'
                      size='sm'
                      onClick={() => edit(row)}
                      mr={2}
                    >
                      Edit
                    </Button>
                  )}
                  {remove && (
                    <Button
                      colorScheme='red'
                      size='sm'
                      onClick={() => remove(row)}
                    >
                      Remove
                    </Button>
                  )}
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

// PropTypes para definir la estructura esperada
TableInfo.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  edit: PropTypes.func,
  remove: PropTypes.func,
  primaryKey: PropTypes.string.isRequired,
  title: PropTypes.string
}

export default TableInfo
