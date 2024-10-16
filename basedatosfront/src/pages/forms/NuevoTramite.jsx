import { Button, FormLabel, Input, Stack, FormControl } from '@chakra-ui/react'
import FormBase from '@components/forms/FormBase.jsx'

const NuevoTramite = () => {
  return (
    <>
      <FormBase nameForm='Nuevo Tramite'>
        <FormControl>
          <Stack spacing={4}>
            <FormLabel>Ingresa un Nuevo Tramite</FormLabel>
            <Input type='text' placeholder='Ejemplo: Tramite de XX para XX' required />
            <Button
              mt={4}
              colorScheme='teal'
              type='submit'
            >
              Guardar
            </Button>
          </Stack>
        </FormControl>
      </FormBase>
    </>
  )
}

export default NuevoTramite
