import RenderContext from '@context/RenderContext.jsx'
import FuncionarioForm from '@pages/forms/FuncionarioForm'
import NuevoOficina from '@pages/forms/NuevaOficina'
import NuevoEdificio from '@pages/forms/NuevoEdificio'
import NuevoTramite from '@pages/forms/NuevoTramite'
import VisitanteForm from '@pages/forms/VisitanteForm'
import Sidebar from '@pages/SideBar.jsx'
import { useContext, useEffect, useState } from 'react'
import { isAuthenticated } from '@utils/auth/auth'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import NuevaVisita from './pages/forms/NuevaVisita'

function App () {
  const toast = useToast()
  const { formRender } = useContext(RenderContext)
  const isAuth = isAuthenticated()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuth) {
      return navigate('/login')
    }
  }, [navigate, isAuth])

  useEffect(() => {
    const checkDatabaseConnection = async () => {
      try {
        const response = await fetch('http://localhost:8000/check-connection')
        if (!response.ok) {
          throw new Error('Error al verificar la conexión')
        }
        const isConnected = await response.json()
        if (!isConnected) {
          localStorage.removeItem('token')
          return navigate('login')
        }
      } catch (_) {
        toast({
          title: 'Error',
          description: 'No hay conexión con el Servidor',
          status: 'error',
        })
        return navigate('/login')
      }
    }
    checkDatabaseConnection()
  }, [formRender, navigate, toast])

  return (
    <>
      {isAuth

        ? <Sidebar>
          {formRender.nuevoTramite ? <NuevoTramite /> : <></>}
          {formRender.nuevoFuncionario ? <FuncionarioForm /> : <></>}
          {formRender.visitanteForm ? <VisitanteForm /> : <></>}
          {formRender.nuevaOficina ? <NuevoOficina /> : <></>}
          {formRender.nuevoEdificio ? <NuevoEdificio /> : <></>}
          {formRender.nuevaVisita ? <NuevaVisita /> : <></>}
          {/* eslint-disable-next-line @stylistic/jsx-closing-tag-location */}
        </Sidebar>
        : <></>}
    </>
  )
}

export default App
