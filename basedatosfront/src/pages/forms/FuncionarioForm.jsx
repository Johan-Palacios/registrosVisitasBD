import useGetFetch from '@hooks/useGetFetch'
import { Button, FormControl, FormLabel, Input, Select, Stack, useToast } from '@chakra-ui/react'
import FormBase from '@components/forms/FormBase.jsx'
import { useEffect, useState } from 'react'

const FuncionarioForm = () => {
  const toast = useToast()
  const { data: tramites, loading: loadingTramites } = useGetFetch('http://localhost:8000/tramites')
  const { data: edificios, loading: loadingEdificios } = useGetFetch('http://localhost:8000/edificios')

  const [dpi, setDPI] = useState()
  const [nombre, setNombre] = useState()
  const [apellidos, setApellidos] = useState()
  const [tramite, setTramite] = useState()
  const [edificio, setEdificio] = useState()
  const [oficinas, setOficinas] = useState()
  const [oficina, setOficina] = useState()
  const [loadingOficinas, setOficinasLoading] = useState(true)

  const handleDPI = (e) => {
    const input = e.target.value
    if (/^\d{0,13}$/.test(input)) {
      setDPI(input)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  useEffect(() => {

  }, [edificio])

  return (
    <>
      <FormBase nameForm='Agregar Funcionario' onSubmit={handleSubmit}>
        <FormControl>
          <Stack spacing={4}>

            <FormLabel>DPI Funcionario </FormLabel>
            <Input type='text' inputMode='numeric' maxLength={13} minLength={13} value={dpi} onChange={handleDPI} placeholder='Ejemplo: 2979348101301' required />

            <FormLabel>Nombre Funcionario </FormLabel>
            <Input type='text' placeholder='Ejemplo: Juan Emiliano' maxLength={50} onChange={(e) => setNombre(e.target.value)} required />

            <FormLabel>Apellidos Visitante </FormLabel>
            <Input type='text' placeholder='Ejemplo:  Paredes Camposeco' required maxLength={59} onChange={(e) => setApellidos(e.target.value)} />

            {
              !loadingTramites && !loadingEdificios
                ? <>

                  <FormLabel>Seleccione Tipo Tramite</FormLabel>

                  <Select placeholder='Ningun tramite Seleccionado' required marginBottom={2} onChange={(e) => setTramite(e.target.value)}>

                    {tramites.map(({ idTramite, idTramiteNumber, tramite }) => {
                      return <option key={idTramite} value={idTramiteNumber}>{`${idTramite} - ${tramite}`}</option>
                    })}

                  </Select>

                  <FormLabel>Seleccione Edificio</FormLabel>

                  <Select placeholder='Ningun Edificio' required marginBottom={2} onChange={(e) => setEdificio(e.target.value)}>
                    {edificios.map(({ idEdificioNumber, idEdificio, edificio }) => {
                      return <option key={idEdificioNumber} value={idEdificioNumber}>{`${idEdificio} - ${edificio}`}</option>
                    })}
                  </Select>
                  {edificio
                    ? <>

                      <FormLabel>Selecciona la Oficina</FormLabel>

                      <Select placeholder='Ninguna Oficina' required marginBottom={2} onChange={(e) => setOficina(e.target.value)}>
                        {/* {oficinas.map(({ idOficina, numeroOficina, oficina }) => { */}
                        {/*   return <option key={idOficina} value={numeroOficina}>{`${idOficina} - ${oficina}`}</option> */}
                        {/* })} */}
                      </Select>

                      <Button
                        mt={4}
                        colorScheme='teal'
                        type='submit'
                      >
                        Guardar
                      </Button>
                      {/* eslint-disable-next-line @stylistic/jsx-closing-tag-location */}
                    </>
                    : <></>}

                  {/* eslint-disable-next-line @stylistic/jsx-indent */}
                  </>
                : <></>

            }

          </Stack>
        </FormControl>
      </FormBase>
    </>
  )
}
export default FuncionarioForm
