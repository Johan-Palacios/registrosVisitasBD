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
    const token = localStorage.getItem('token')

    const insertToast = toast({
      title: 'Conectando con el servidor',
      description: 'Cargando...',
      status: 'loading',
    })

    try {
      const response = await fetch('http://localhost:8000/insertar-tramite', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      toast.close(insertToast)
      if (response.ok) {
        toast({
          title: 'Trámite Guardado',
          description: 'Inserción Exitosa',
          status: 'success',
        })
      }
      if (!response.ok) {
        toast({
          title: 'Error',
          description: 'No es posible guardar el Trámite',
          status: 'error',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo establecer conexión con el servidor',
        status: 'error',
      })
    }
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
