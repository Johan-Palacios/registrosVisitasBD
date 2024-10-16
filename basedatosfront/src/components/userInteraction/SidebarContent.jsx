import { Flex, Text, Box, Collapse, useDisclosure, Icon } from '@chakra-ui/react'
import NavItem from './NavItem.jsx'
import { ChevronDownIcon } from '@chakra-ui/icons'

const SidebarContent = (props) => {
  const manageVisitas = useDisclosure()
  const manageSpaces = useDisclosure()
  const manageAdmin = useDisclosure()

  return (
    <Box
      as='nav'
      pos='fixed'
      top='0'
      left='0'
      zIndex='sticky'
      h='full'
      pb='10'
      overflowX='hidden'
      overflowY='auto'
      bg='white'
      _dark={{
        bg: 'gray.800',
      }}
      border
      color='inherit'
      borderRightWidth='1px'
      w='60'
      {...props}
    >
      <Flex px='4' py='5' align='center'>
        <Text
          fontSize='2xl'
          ml='2'
          color='brand.500'
          _dark={{
            color: 'white',
          }}
          fontWeight='semibold'
        >
          Registro Visitas
        </Text>
      </Flex>
      <Flex
        direction='column'
        as='nav'
        fontSize='sm'
        color='gray.600'
        aria-label='Main Navigation'
      >

        <NavItem onClick={manageAdmin.onToggle}>
          Gestionar Administración
          <Icon
            as={ChevronDownIcon}

            ml='auto'
            transform={manageAdmin.isOpen && 'rotate(90deg)'}
          />
        </NavItem>
        <Collapse in={manageAdmin.isOpen}>
          <NavItem pl='12' py='2'>
            Agregar Nuevo Tramite
          </NavItem>
          <NavItem pl='12' py='2'>
            Agregar Funcionario
          </NavItem>
        </Collapse>

        <NavItem onClick={manageVisitas.onToggle}>
          Gestionar Visitantes
          <Icon
            as={ChevronDownIcon}

            ml='auto'
            transform={manageVisitas.isOpen && 'rotate(90deg)'}
          />
        </NavItem>
        <Collapse in={manageVisitas.isOpen}>
          <NavItem pl='12' py='2'>
            Agregar Visitante
          </NavItem>
          <NavItem pl='12' py='2'>
            Agregar Visita
          </NavItem>
        </Collapse>

        <NavItem onClick={manageSpaces.onToggle}>
          Gestionar Espacios
          <Icon
            as={ChevronDownIcon}

            ml='auto'
            transform={manageSpaces.isOpen && 'rotate(90deg)'}
          />
        </NavItem>
        <Collapse in={manageSpaces.isOpen}>
          <NavItem pl='12' py='2'>
            Agregar Oficina
          </NavItem>
          <NavItem pl='12' py='2'>
            Agregar Edificio
          </NavItem>
        </Collapse>
      </Flex>
    </Box>
  )
}

export default SidebarContent
