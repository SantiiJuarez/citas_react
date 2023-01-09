import {useState, useEffect} from "react"
import Error from "./Error";

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [error, setError] = useState(false)

   useEffect(() => {
      if(Object.keys(paciente).length > 0){
        setNombre(paciente.nombre)
        setPropietario(paciente.propietario)
        setEmail(paciente.email)
        setFecha(paciente.fecha)
        setSintomas(paciente.sintomas)
      }
  }, [paciente]) //Se ejecuta solo cuando paciente cambia
  



  const generarid = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36)
    return random+ fecha
  }

  const handleSubmit = (e) => {
    e.preventDefault(); //Para que no recargue cuando envio el form
    //Validacion del formulario
    if([nombre,propietario,email,fecha,sintomas].includes('')){
      
      setError(true)
      return;
    }

    setError(false)

    //Objeto de Paciente
    const objetoPaciente = {
      nombre,propietario,email,fecha,sintomas
    }

    if(paciente.id){
      //Editando el Registro
      objetoPaciente.id = paciente.id
      const pacientesActualizados = pacientes.map(pacienteState => 
        pacienteState.id === paciente.id 
        ? objetoPaciente  : pacienteState)
        //ObjetoPaciente es el objeto actualizado y pacienteState es el actual que no quiero modificar
        setPacientes(pacientesActualizados)
        setPaciente({})
    }else{
      //Nuevo Registro
      objetoPaciente.id = generarid();
      setPacientes([...pacientes, objetoPaciente])
    }

    //Reiniciar el form
    setNombre("")
    setPropietario("")
    setEmail("")
    setFecha("")
    setSintomas("")
  }
    
  
  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className='font-black text-3xl text-center'>Seguimiento Pacientes</h2>

      <p className='text-lg mt-5 text-center mb-10'>
        Añade Pacientes y {""}
        <span className='text-indigo-600 font-bold'>Administralos</span>
      </p>

      <form 
      onSubmit={handleSubmit}  
      className='bg-white shadow-md rounded-lg py-10 px-5'>
        {error && <Error>Todos los campos son obligatorios</Error>
          }
        <div className='mb-5'>
          <label htmlFor="mascota" className='block text-gray-700 uppercase '>Nombre Mascota</label>

          <input
          id='mascota'
          type='text'
          placeholder='Nombre de la Mascota'
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 lg rounded-md'
          value={nombre}
          onChange={ (e) => setNombre(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor="propietario" className='block text-gray-700 uppercase '>Nombre Propietario</label>

          <input
          id="propietario"
          type='text'
          placeholder='Nombre del Propietario'
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 lg rounded-md'
          value={propietario}
          onChange={ (e) => setPropietario(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor="email" className='block text-gray-700 uppercase '>Email</label>

          <input
          id="email"
          type='email' 
          placeholder='Email Contacto Propietario'
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 lg rounded-md'
          value={email}
          onChange={ (e) => setEmail(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor="alta" className='block text-gray-700 uppercase'>Alta</label>

          <input
          id="alta"
          type='date' 
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 lg rounded-md'
          value={fecha}
          onChange={ (e) => setFecha(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor="síntomas" className='block text-gray-700 uppercase'>Sintomas</label>
          <textarea
            id="sintomas"
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 lg rounded-md'
            value={sintomas}
            onChange={ (e) => setSintomas(e.target.value)}
            placeholder="Describe los sintomas"
          />
        </div>

        <input
          type='submit'
          value={paciente.id ? 'Editar Paciente' : "Agregar Paciente"}
          className='w-full p-3 text-white uppercase font-bold bg-indigo-600
           hover:bg-indigo-700 cursor-pointer'
        />
      </form>
    </div>
  )
}

export default Formulario
