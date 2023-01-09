import { useState, useEffect } from 'react'
import Formulario from './components/Formulario'
import Header from './components/Header'
import ListadoPacientes from './components/ListadoPacientes'

function App() {

//Aca van funciones/validaciones,etc
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});
  
  useEffect(() => {
    const obtenerLS = () => {
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes') ?? [] )
      setPacientes(pacientesLS)

    }
    obtenerLS();
  },[])

  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes)) //stringify lo convierte en string
  },[pacientes])

  const eliminarPaciente = (id) => {
    const pacientesActualizados = pacientes.filter(paciente =>
     paciente.id !== id)
    setPacientes(pacientesActualizados)
    }

  return (//Esto se ve en pantalla, puedo poner expresiones pero no sentencias

    <div className='container mx-auto mt-20'> 
      <Header/>
      <div className="mt-12 md:flex">
        <Formulario
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
        <ListadoPacientes
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
        />  
      </div>
    </div>
  )
}

export default App
 