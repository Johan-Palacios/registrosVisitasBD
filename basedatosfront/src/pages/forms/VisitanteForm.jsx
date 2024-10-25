import { Button, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Stack, useToast } from '@chakra-ui/react'
import FormBase from '../../components/forms/FormBase.jsx'
import { useState } from 'react'

const VisitanteForm = () => {
  const toast = useToast()
  const [dpi, setDPI] = useState()
  const [nombre, setNombre] = useState()
  const [apellido, setApellido] = useState()
  const [telefono, setTelefono] = useState()
  const [direccion, setDireccion] = useState()
  const fetchInsertVisitante = async (data) => {
    const token = localStorage.getItem('token')

    const insertToast = toast({
      title: 'Conectando con el servidor',
      description: 'Cargando...',
      status: 'loading',
    })

    try {
      const response = await fetch('http://localhost:8000/insertar-visitante', {
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
          title: 'Visitante Guardado',
          description: 'Inserción Exitosa',
          status: 'success',
        })
      }
      if (!response.ok) {
        toast({
          title: 'Error',
          description: 'No es posible guardar el Visitante',
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

  const handleSubmit = (e) => {
    e.preventDefault()
    const vistanteData = { dpi: parseInt(dpi), nombre, apellido, telefono, direccion }
    fetchInsertVisitante(vistanteData)
    e.target.reset()
  }

  return (
    <>
      <FormBase onSubmit={handleSubmit} nameForm='Agregar Visitante'>
        <FormControl>
          <Stack spacing={4}>

            <FormLabel>DPI Visitante </FormLabel>
            <Input type='number' placeholder='Ejemplo: 2979348101301' required onChange={(e) => setDPI(e.target.value)} />

            <FormLabel>Nombre Visitante </FormLabel>
            <Input type='text' placeholder='Ejemplo: Juan Emiliano' required onChange={(e) => setNombre(e.target.value)} />

            <FormLabel>Apellidos Visitante </FormLabel>
            <Input type='text' placeholder='Ejemplo:  Paredes Camposeco' required onChange={(e) => setApellido(e.target.value)} />

            <FormLabel>Telefono Visitante </FormLabel>
            <InputGroup>
              <InputLeftAddon>+502</InputLeftAddon>
              <Input type='tel' placeholder='Ejemplo: 54214310' required onChange={(e) => setTelefono(e.target.value)} />
            </InputGroup>

            <FormLabel>Dirección Visitante </FormLabel>
            <Input type='text' placeholder='Ejemplo:  Zona XX, Avenida XXXX ...' required onChange={(e) => setDireccion(e.target.value)} />

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
