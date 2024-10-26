import fetchInsert from '@/utils/fetch/fetchInsert'
import { Button, FormLabel, Input, Stack, FormControl, useToast } from '@chakra-ui/react'
import FormBase from '@components/forms/FormBase.jsx'
import { useState } from 'react'

const NuevoTramite = () => {
  const toast = useToast()
  const [tramite, setTramite] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = { tramite }
    fetchInsertTramite(data)
    e.target.reset()
  }

  const fetchInsertTramite = async (data) => {
    fetchInsert('http://localhost:8000/insertar-tramite',
      data,
      toast,
      'No fue posible guardar el tramite', 'Trámite Guardado')
  }

  return (
    <>
      <FormBase nameForm='Nuevo Tramite' onSubmit={handleSubmit}>
        <FormControl>
          <Stack spacing={4}>
            <FormLabel>Ingresa un Nuevo Tramite</FormLabel>
            <Input type='text' placeholder='Ejemplo: Tramite de XX para XX' required onChange={(e) => { setTramite(e.target.value) }} />
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
