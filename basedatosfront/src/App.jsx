import RenderContext from '@context/RenderContext.jsx'
import FuncionarioForm from '@pages/forms/FuncionarioForm'
import NuevoOficina from '@pages/forms/NuevaOficina'
import NuevoEdificio from '@pages/forms/NuevoEdificio'
import NuevoTramite from '@pages/forms/NuevoTramite'
import VisitanteForm from '@pages/forms/VisitanteForm'
import Sidebar from '@pages/SideBar.jsx'
import { useContext } from 'react'

function App () {
  const { formRender } = useContext(RenderContext)
  return (
    <>
      <Sidebar>
        {formRender.nuevoTramite ? <NuevoTramite /> : <></>}
        {formRender.nuevoFuncionario ? <FuncionarioForm /> : <></>}
        {formRender.visitanteForm ? <VisitanteForm /> : <></>}
        {formRender.nuevaOficina ? <NuevoOficina /> : <></>}
        {formRender.nuevoEdificio ? <NuevoEdificio /> : <></>}
      </Sidebar>
    </>
  )
}

export default App
