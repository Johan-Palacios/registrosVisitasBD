import StepContext from '@/context/StepContext'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Button, FormLabel, Input, Stack, FormControl } from '@chakra-ui/react'
import FormBase from '@components/forms/FormBase.jsx'
import StepperForm from '@components/stepper/StepperForm'
import { useContext } from 'react'

const NuevaVisita = () => {
  const { activeStep, updateStepIndex, steps } = useContext(StepContext)
  return (
    <>
      <FormBase nameForm='Nueva Visita'>
        <FormControl>
          <Stack spacing={4}>
            <StepperForm steps={steps} />
            <FormLabel>Ingresa DPI</FormLabel>
            <Input type='text' placeholder='Ejemplo: 298374661301' required />
            <Button
              mt={4}
              colorScheme='teal'
              rightIcon={<ArrowForwardIcon />}
              onClick={() => updateStepIndex(2)}
            >
              Siguiente
            </Button>
          </Stack>
        </FormControl>
      </FormBase>
    </>
  )
}

export default NuevaVisita
