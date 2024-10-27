import useGetFetch from '@/hooks/useGetFetch'
import fetchInsert from '@/utils/fetch/fetchInsert'
import { Button, FormLabel, Input, Stack, FormControl, Select, useToast } from '@chakra-ui/react'
import FormBase from '@components/forms/FormBase.jsx'
import { useState } from 'react'

const NuevoOficina = () => {
  const toast = useToast()
  const { data, loading } = useGetFetch('http://localhost:8000/edificios')
  const [idEdificio, setidEdificio] = useState()
  const [oficina, setOficina] = useState()
  const [numeroOficina, setNumeroOficina] = useState()

  const handleSelectChange = (event) => {
    setidEdificio(event.target.value)
  }

  const fetchInsertOficina = async (data) => {
    await fetchInsert('http://localhost:8000/insertar-oficina',
      data,
      toast,
      'No se pudo insertar la Oficina\nPorque ya Existe', 'Oficina Guardada')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = { idEdificio, oficina, numeroOficina }
    fetchInsertOficina(data)
    e.target.reset()
  }

  return (
    <>
      <FormBase nameForm='Nueva Oficina' onSubmit={handleSubmit}>
        <FormControl>
          <Stack spacing={4}>

            <FormLabel>Ingresa un Nueva Oficina</FormLabel>
            <Input type='text' placeholder='Ejemplo: Oficina XX' required maxLength={50} onChange={(e) => setOficina(e.target.value)} />
            <FormLabel>Ingresa un Numero Oficina</FormLabel>
            <Input type='number' placeholder='Ejemplo: 1' required onChange={(e) => setNumeroOficina(e.target.valueAsNumber)} />

            {!loading

              ? <>
                <FormLabel>Seleccione Edificio</FormLabel>

                <Select placeholder='Ningun Edificio' required marginBottom={2} onChange={handleSelectChange}>
                  {data.map(({ idEdificioNumber, idEdificio, edificio }) => {
                    return <option key={idEdificioNumber} value={idEdificioNumber}>{`${idEdificio} - ${edificio}`}</option>
                  })}
                </Select>

                {/* eslint-disable-next-line @stylistic/jsx-indent */}
                </>
              : <></>}

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
