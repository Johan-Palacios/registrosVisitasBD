import { Button, FormLabel, Input, Stack, FormControl } from "@chakra-ui/react"
import FormBase from '@components/forms/FormBase.jsx'


const NuevoEdificio = () => {
  return (
    <>
      <FormBase>
        <FormControl>
          <Stack spacing={4}>
            <FormLabel>Ingresa un Nuevo Edificio</FormLabel>
            <Input type='text' placeholder="Ejemplo: Edificio XX" required />
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

export default NuevoEdificio
