import { Box, Heading, Text, Center, Flex, VisuallyHidden, Button, Input } from "@chakra-ui/react"

const AuthMenu = () => {
  return (
    <>
      <Box width='100%' height={'100%'}>
        <Box as="form" mb={6} rounded="lg" shadow="xl" display='flex' flexDirection='column' alignContent={'center'} justifyContent={'center'} width='100%' height={'100%'}>
          <Center
            pb={0}
          >
            <Heading
              mb={6}
              fontSize={{ base: "4xl", md: "6xl", lg: "8xl" }}
              fontWeight="bold"
              lineHeight="none"
              letterSpacing={{ base: "normal", md: "tight" }}
              color="gray.900"
              _dark={{
                color: "gray.100",
              }}
            >
              <Text
                display="inline"
                w="full"
                bgClip="text"
                bgGradient="linear(to-r, green.400,purple.500)"
                fontWeight="extrabold"
              >
                Iniciar Sesión
              </Text>
            </Heading>
          </Center>
            <Flex alignContent={'center'} flexDirection={"column"} rowGap={2} marginRight={20} marginLeft={20} justifyContent={"center"}>
              <VisuallyHidden>Usuario</VisuallyHidden>
              <Input alignSelf={'center'} maxWidth={600}  type="text" placeholder="Ingresa tu usuario" />
              <VisuallyHidden>Contraseña</VisuallyHidden>
              <Input alignSelf={'center'} maxWidth={600} type="password" placeholder="Ingresa tu Contraseña" />
            <Button
              marginTop={26}
              maxWidth={300}
              minWidth={225}
            alignSelf={'center'}
              py={2}
              w="full"
              colorScheme="blue"
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
