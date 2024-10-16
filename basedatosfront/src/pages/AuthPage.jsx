import { Box } from '@chakra-ui/react'
import AuthMenu from '@components/auth/AuthMenu.jsx'

const AuthPage = () => {
  return (
    <>
      <Box display='flex' alignItems='center' justifyContent='center' height='100vh'>
        <AuthMenu />
      </Box>
    </>
  )
}

export default AuthPage
