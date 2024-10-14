import { StrictMode } from 'react'
import theme from './libs/theme'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App.jsx'
import AuthPage from './pages/AuthPage.jsx'

const router = createBrowserRouter([
  {
    path: "/login",
    element: <AuthPage/>,
  },
  {
    path: "/",
    element: <App/>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>,
)
