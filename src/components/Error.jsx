
const Error = ({children}) => {
  return (
    <div className="bg-red-800 text-white p-3 text-center font-bold uppercase mb-3 rounded-lg" >
          <p>{children}
          </p>
    </div>
  )
}

export default Error
