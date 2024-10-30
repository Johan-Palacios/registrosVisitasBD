import RenderContext from '@/context/RenderContext'
import StepContext from '@/context/StepContext'
import useGetFetch from '@/hooks/useGetFetch'
import fetchInsert from '@/utils/fetch/fetchInsert'
import fetchQuery from '@/utils/fetch/fetchQuery'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Button, FormControl, FormLabel, Heading, Input, Select, Stack, Text, useToast } from '@chakra-ui/react'
import FormBase from '@components/forms/FormBase.jsx'
import StepperForm from '@components/stepper/StepperForm'
import { useContext, useEffect, useState } from 'react'

const NuevaVisita = () => {
  const toast = useToast()
  const { activeStep, updateStepIndex, steps } = useContext(StepContext)
  const { data: tramites, loading: loadingTramites } = useGetFetch('http://localhost:8000/tramites')
  const { updateRenderContext } = useContext(RenderContext)
  const [dpi, setDpi] = useState()
  const [visitante, setVisitante] = useState()
  const [tramite, setTramite] = useState()

  const getCurrentDate = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const getCurrentTime = () => {
    const now = new Date()
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  }

  const handleDPI = (e) => {
    const input = e.target.value
    if (/^\d{0,13}$/.test(input)) {
      setDpi(input)
    }
  }

  const currentTramite = () => {
    const current = tramites.filter((item) => {
      const idTramite = parseInt(tramite)
      return idTramite === item.idTramiteNumber
    })
    console.log(current)
    return current
  }

  const fetchDPI = async (data) => {
    const dataResult = await fetchQuery('http://localhost:8000/visitante-by-dpi', data)
    if (dataResult[0]) {
      setVisitante(dataResult[0])
      updateStepIndex(1)
    }
    if (!dataResult[0]) {
      toast({
        title: 'El DPI no Existe en la BD',
        description: 'Ingrese sus datos',
        status: 'success',
        isClosable: true
      })

      updateRenderContext('visitanteForm')
    }
  }

  const handleTramite = (e) => {
    e.preventDefault()
    updateStepIndex(2)
    e.target.reset()
  }

  const handleSubmitDPI = (e) => {
    e.preventDefault()
    const data = { visitanteDPI: dpi }
    fetchDPI(data)
    e.target.reset()
  }

  const fetchInsertVisita = async (data) => {
    await fetchInsert('http://localhost:8000/insertar-visita',
      data,
      toast,
      'No se pudo realizar la Visita', 'Visita Registrada')
  }

  const fetchInsertVisitaTramite = async (data) => {
    await fetchInsert('http://localhost:8000/insertar-tramite-visita',
      data,
      toast,
      'No se pudo realizar registro de Tramite', 'Visita con Trámite Registrada')
  }

  const handleSubmitVisita = (e) => {
    e.preventDefault()
    const hour = getCurrentTime()
    const dateCurrent = getCurrentDate()

    fetchInsertVisita({
      idVisitante: parseInt(visitante.idVisitanteNumber),
      fecha: dateCurrent,
      hora: hour
    })

    fetchInsertVisitaTramite({
      idVisitante: parseInt(visitante.idVisitanteNumber),
      idTramite: parseInt(tramite),
      fecha: dateCurrent
    })

    e.target.reset()
  }

  useEffect(() => {
    updateStepIndex(0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!visitante && activeStep === 1) {
      updateStepIndex(0)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visitante, activeStep])

  return (
    <>
      <StepperForm steps={steps} />
      {activeStep === 0

        ? <FormBase onSubmit={handleSubmitDPI} nameForm='Ingreso de DPI'>
          <FormControl>
            <Stack spacing={4}>
              <FormLabel>Ingresa DPI</FormLabel>
              <Input type='text' placeholder='Ejemplo: 298374661301' value={dpi} required maxLength={13} minLength={13} onChange={(e) => handleDPI(e)} />
              <Button
                mt={4}
                colorScheme='teal'
                rightIcon={<ArrowForwardIcon />}
                type='submit'
              >
                Siguiente
              </Button>
            </Stack>

          </FormControl>
          {/* eslint-disable-next-line @stylistic/jsx-closing-tag-location */}
        </FormBase>

        : <></>}

      {activeStep === 1 && visitante

        ? <FormBase onSubmit={handleTramite} nameForm='Selección el tramite'>
          <FormControl>
            <Stack spacing={4}>

              {
              !loadingTramites
                ? <>

                  <Heading as='h3' size='sm'>Datos del Visistante</Heading>
                  <Text>{`ID del Visitante: ${visitante.idVisitante}`}</Text>
                  <Text>{`Nombre del Visitante: ${visitante.nombre}`}</Text>
                  <Text>{`Apellido del Visitante: ${visitante.apellido}`}</Text>
                  <Text>{`Dirección del Visitante: ${visitante.direccion}`}</Text>
                  <Text>{`Telefono del Visitante: +502 ${visitante.telefono}`}</Text>

                  <FormLabel>Seleccione Tramite</FormLabel>

                  <Select placeholder='Ningun Tramite' required marginBottom={2} onChange={(e) => setTramite(e.target.value)}>
                    {tramites.map(({ idTramite, idTramiteNumber, tramite }) => {
                      return <option key={idTramite} value={idTramiteNumber}>{`${idTramite} - ${tramite}`}</option>
                    })}
                  </Select>

                  <Button
                    mt={4}
                    colorScheme='teal'
                    rightIcon={<ArrowForwardIcon />}
                    type='submit'
                  >
                    Siguiente
                  </Button>

                  {/* eslint-disable-next-line @stylistic/jsx-indent */}
                  </>

                : <></>

            }

            </Stack>

          </FormControl>
          {/* eslint-disable-next-line @stylistic/jsx-closing-tag-location */}
        </FormBase>

        : <></>}

      {activeStep === 2 && visitante && tramite

        ? <FormBase onSubmit={handleSubmitVisita} nameForm='Confirmar Tramite para Visita'>
          <FormControl>
            <Stack spacing={4}>

              <Heading as='h3' size='sm'>Datos del Visistante</Heading>
              <Text>{`ID del Visitante: ${visitante.idVisitante}`}</Text>
              <Text>{`Nombre del Visitante: ${visitante.nombre}`}</Text>
              <Text>{`Apellido del Visitante: ${visitante.apellido}`}</Text>
              <Text>{`Dirección del Visitante: ${visitante.direccion}`}</Text>
              <Text>{`Telefono del Visitante: +502 ${visitante.telefono}`}</Text>

              <Text>{`Tramite a Realizar: ${currentTramite()[0].idTramite} - ${currentTramite()[0].tramite}`}
              </Text>

              <Button
                mt={4}
                colorScheme='teal'
                type='submit'
              >
                Confirmar
              </Button>
            </Stack>

          </FormControl>
          {/* eslint-disable-next-line @stylistic/jsx-closing-tag-location */}
        </FormBase>

        : <></>}

    </>
  )
}

export default NuevaVisita
