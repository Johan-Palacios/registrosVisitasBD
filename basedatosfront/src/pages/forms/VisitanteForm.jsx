import { Button, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Stack } from '@chakra-ui/react'
import FormBase from '../../components/forms/FormBase.jsx'

const VisitanteForm = () => {
  return (
    <>
      <FormBase nameForm='Agregar Visitante'>
        <FormControl>
          <Stack spacing={4}>

            <FormLabel>DPI Visitante </FormLabel>
            <Input type='number' placeholder='Ejemplo: 2979348101301' required />

            <FormLabel>Nombre Visitante </FormLabel>
            <Input type='text' placeholder='Ejemplo: Juan Emiliano' required />

            <FormLabel>Apellidos Visitante </FormLabel>
            <Input type='text' placeholder='Ejemplo:  Paredes Camposeco' required />

            <FormLabel>Telefono Visitante </FormLabel>
            <InputGroup>
              <InputLeftAddon>+502</InputLeftAddon>
              <Input type='tel' placeholder='Ejemplo: 54214310' required />
            </InputGroup>

            <FormLabel>Dirección Visitante </FormLabel>
            <Input type='text' placeholder='Ejemplo:  Zona XX, Avenida XXXX ...' required />

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
export default VisitanteForm
