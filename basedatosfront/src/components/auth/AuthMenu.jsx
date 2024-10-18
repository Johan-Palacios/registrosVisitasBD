import { Box, Button, Center, Flex, Heading, Input, Text, VisuallyHidden, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthMenu = () => {
  const toast = useToast()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const registrationToast = toast({
      title: 'Conectando con el servidor',
      description: 'Cargando...',
      status: 'loading',
    })

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()
      toast.close(registrationToast)
      console.log(response)
      if (response.status === 200) {
        localStorage.setItem('token', data.access_token)
        toast({
          title: 'Usuario Autenticado',
          description: 'Iniciando Dashboard',
          status: 'success',
        })
        return navigate('/')
      } else if (response.status === 400) {
        toast({
          title: 'Error',
          description: 'Credenciales Invalidas',
          status: 'error',
        })
      } else {
        toast({
          title: 'Error',
          description: 'No se pudo establecer conexión con el servidor',
          status: 'error',
        })
      }
    } catch (error) {
      toast.close(registrationToast)
      toast({
        title: 'Error',
        description: 'No se pudo establecer conexión con el servidor',
        status: 'error',
      })
    }
  }
  return (
    <>
      <Box width='100%' height='100%'>
        <Box mb={6} rounded='lg' shadow='xl' display='flex' flexDirection='column' alignContent='center' justifyContent='center' width='100%' height='100%'>
          <Center
            pb={0}
          >
            <Heading
              mb={6}
              fontSize={{ base: '4xl', md: '6xl', lg: '8xl' }}
              fontWeight='bold'
              lineHeight='none'
              letterSpacing={{ base: 'normal', md: 'tight' }}
              color='gray.900'
              _dark={{
                color: 'gray.100',
              }}
            >
              <Text
                display='inline'
                w='full'
                bgClip='text'
                bgGradient='linear(to-r, green.400,purple.500)'
                fontWeight='extrabold'
              >
                Iniciar Sesión
              </Text>
            </Heading>
          </Center>
          <Flex as='form' alignContent='center' flexDirection='column' rowGap={2} marginRight={20} marginLeft={20} justifyContent='center' onSubmit={handleSubmit}>
            <VisuallyHidden>Usuario</VisuallyHidden>
            <Input alignSelf='center' maxWidth={600} type='text' placeholder='Ingresa tu usuario' onChange={(e) => setUsername(e.target.value)} />
            <VisuallyHidden>Contraseña</VisuallyHidden>
            <Input alignSelf='center' maxWidth={600} type='password' placeholder='Ingresa tu Contraseña' onChange={(e) => setPassword(e.target.value)} />
            <Button
              marginTop={26}
              maxWidth={300}
              minWidth={225}
              alignSelf='center'
              py={2}
              w='full'
              colorScheme='blue'
              type='submit'
            >
              Iniciar Sesion
            </Button>
          </Flex>
        </Box>
      </Box>
    </>

  )
}

export default AuthMenu
