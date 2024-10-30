/* eslint-disable react/jsx-handler-names */
import { Flex, Text, Box, Collapse, useDisclosure, Icon } from '@chakra-ui/react'
import NavItem from './NavItem.jsx'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useContext } from 'react'
import RenderContext from '@context/RenderContext.jsx'

const SidebarContent = (props) => {
  const handleVisitas = useDisclosure()
  const handleSpaces = useDisclosure()
  const handleAdmin = useDisclosure()
  const { updateRenderContext } = useContext(RenderContext)

  const handleNuevoTramite = () => {
    updateRenderContext('nuevoTramite')
  }

  const handleNuevoFuncionario = () => {
    updateRenderContext('nuevoFuncionario')
  }

  const handleNuevoVisitante = () => {
    updateRenderContext('visitanteForm')
  }

  const handleNuevaOficina = () => {
    updateRenderContext('nuevaOficina')
  }

  const handleNuevoEdificio = () => {
    updateRenderContext('nuevoEdificio')
  }

  const handleNuevaVisita = () => {
    updateRenderContext('nuevaVisita')
  }

  const handleVerVisitantes = () => {
    updateRenderContext('verVisitantes')
  }

  const handleVerTramites = () => {
    updateRenderContext('verTramites')
  }

  const handleVerEdificios = () => {
    updateRenderContext('verEdificios')
  }

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

        <NavItem onClick={handleAdmin.onToggle}>
          Gestionar Administración
          <Icon
            as={ChevronDownIcon}
            ml='auto'
            transform={handleAdmin.isOpen && 'rotate(90deg)'}
          />
        </NavItem>
        <Collapse in={handleAdmin.isOpen}>
          <NavItem pl='12' py='2' onClick={handleNuevoTramite}>
            Agregar Nuevo Tramite
          </NavItem>

          <NavItem pl='12' py='2' onClick={handleVerTramites}>
            Ver Tramites
          </NavItem>
          <NavItem pl='12' py='2' onClick={handleNuevoFuncionario}>
            Agregar Funcionario
          </NavItem>
        </Collapse>

        <NavItem onClick={handleVisitas.onToggle}>
          Gestionar Visitantes
          <Icon
            as={ChevronDownIcon}
            ml='auto'
            transform={handleVisitas.isOpen && 'rotate(90deg)'}
          />
        </NavItem>
        <Collapse in={handleVisitas.isOpen}>
          <NavItem pl='12' py='2' onClick={handleNuevoVisitante}>
            Agregar Visitante
          </NavItem>

          <NavItem pl='12' py='2' onClick={handleVerVisitantes}>
            Ver Visitantes
          </NavItem>
          <NavItem pl='12' py='2' onClick={handleNuevaVisita}>
            Agregar Visita
          </NavItem>
        </Collapse>

        <NavItem onClick={handleSpaces.onToggle}>
          Gestionar Espacios
          <Icon
            as={ChevronDownIcon}
            ml='auto'
            transform={handleSpaces.isOpen && 'rotate(90deg)'}
          />
        </NavItem>
        <Collapse in={handleSpaces.isOpen}>
          <NavItem pl='12' py='2' onClick={handleNuevaOficina}>
            Agregar Oficina
          </NavItem>
          <NavItem pl='12' py='2' onClick={handleNuevoEdificio}>
            Agregar Edificio
          </NavItem>

          <NavItem pl='12' py='2' onClick={handleVerEdificios}>
            Ver Edificios
          </NavItem>
        </Collapse>
      </Flex>
    </Box>
  )
}

export default SidebarContent
