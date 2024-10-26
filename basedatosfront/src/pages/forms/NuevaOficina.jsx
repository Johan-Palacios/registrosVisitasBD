import useGetFetch from '@/hooks/useGetFetch'
import { Button, FormLabel, Input, Stack, FormControl, Select } from '@chakra-ui/react'
import FormBase from '@components/forms/FormBase.jsx'

const NuevoOficina = () => {
  const {data, loading, error} = useGetFetch('http://localhost:8000/edificios')
  console.log(data)

  return (
    <>
      <FormBase nameForm='Nueva Oficina'>
        <FormControl>
          <Stack spacing={4}>
            <FormLabel>Ingresa un Nueva Oficina</FormLabel>
            <Input type='text' placeholder='Ejemplo: Oficina XX' required />

            {/* {loading? } */}
            <FormLabel>Seleccione Edificio</FormLabel>
            <Select placeholder='Ningun parametro Seleccionado' required marginBottom={2}>
              {/* {availableInterestParam.map(({ name }) => { */}
              {/*   return <option key={name}>{name}</option> */}
              <option>Edificio 1 Ejemplo</option>
              <option>Edificio 2 Ejemplo</option>
              <option>Edificio 3 Ejemplo</option>
              <option>Edificio 4 Ejemplo</option>
              <option>Edificio 5 Ejemplo</option>
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

export default NuevoOficina
