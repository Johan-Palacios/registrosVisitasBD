import fetchInsert from '@utils/fetch/fetchInsert'
import { Button, FormLabel, Input, Stack, FormControl, useToast } from '@chakra-ui/react'
import FormBase from '@components/forms/FormBase.jsx'
import { useState } from 'react'

const NuevoEdificio = () => {
  const toast = useToast()
  const [edificio, setEdificio] = useState('')

  const fetchEdificio = async (data) => {
    await fetchInsert('http://localhost:8000/insertar-edificio',
      data,
      toast,
      'No se pudo insertar el Edificio', 'Edificio Guardado')
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = { edificio }
    fetchEdificio(data)
    e.target.reset()
  }

  return (
    <>
      <FormBase onSubmit={handleSubmit} nameForm='Nuevo Edificio'>
        <FormControl>
          <Stack spacing={4}>
            <FormLabel>Ingresa un Nuevo Edificio</FormLabel>
            <Input type='text' placeholder='Ejemplo: Edificio XX' required maxLength={50} onChange={(e) => setEdificio(e.target.value)} />
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
