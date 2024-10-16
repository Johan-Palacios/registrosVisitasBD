import { Box, Heading } from '@chakra-ui/react'
import { PropTypes } from 'prop-types'
const FormBase = ({ nameForm, children }) => {
  return (
    <>
      <Heading marginBottom={16}>{nameForm}</Heading>
      <Box as='form'>
        {children}
      </Box>
    </>
  )
}

FormBase.propTypes = {
  nameForm: PropTypes.string,
  children: PropTypes.element
}

export default FormBase
