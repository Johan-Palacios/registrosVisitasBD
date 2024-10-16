import { Button, FormLabel, Input, Stack, FormControl } from '@chakra-ui/react'
import FormBase from '@components/forms/FormBase.jsx'

const NuevoOficina = () => {
  return (
    <>
      <FormBase nameForm='Nueva Oficina'>
        <FormControl>
          <Stack spacing={4}>
            <FormLabel>Ingresa un Nueva Oficina</FormLabel>
            <Input type='text' placeholder='Ejemplo: Oficina XX' required />
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

export default NuevoOficina
