import AuthMenu from './components/auth/AuthMenu.jsx'
import { Box } from '@chakra-ui/react'

function App() {
  return (
    <>
      <Box display='flex' alignItems='center' justifyContent={'center'} height={'100vh'}>
        <AuthMenu/>
      </Box>
    </>
  )
}

export default App
