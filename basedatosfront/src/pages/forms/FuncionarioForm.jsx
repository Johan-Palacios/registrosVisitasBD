import { Button, FormControl, FormLabel, Input, Select, Stack } from "@chakra-ui/react"
import FormBase from '../../components/forms/FormBase.jsx'

const FuncionarioForm = () => {

  return (
    <>
      <FormBase>
        <FormControl>
          <Stack spacing={4}>

            <FormLabel>DPI Funcionario </FormLabel>
            <Input type='number' placeholder="Ejemplo: 2979348101301" required />


            <FormLabel>Nombre Funcionario </FormLabel>
            <Input type='text' placeholder="Ejemplo: Juan Emiliano" required />

            <FormLabel>Apellidos Visitante </FormLabel>
            <Input type='text' placeholder="Ejemplo:  Paredes Camposeco" required />

            <FormLabel>Seleccione Parametro de Interés</FormLabel>
            <Select placeholder='Ningun parametro Seleccionado' /* onChange={} */ required marginBottom={2}>
              {/* {availableInterestParam.map(({ name }) => { */}
              {/*   return <option key={name}>{name}</option> */}
              <option>Tramite 1 Ejemplo</option>
              <option>Tramite 2 Ejemplo</option>
              <option>Tramite 3 Ejemplo</option>
              <option>Tramite 4 Ejemplo</option>
              <option>Tramite 5 Ejemplo</option>
              {/* })} */}
            </Select>

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
export default FuncionarioForm
