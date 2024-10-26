import { useState, useEffect } from 'react'

const useGetFetch = (endPoint) => {
  const token = localStorage.getItem('token')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true) // Inicia el estado de carga
      try {
        const response = await fetch(endPoint, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        // Manejo de errores HTTP
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()
        setData(result) // Almacena los datos en el estado
      } catch (err) {
        setError(err.message) // Maneja el error
      } finally {
        setLoading(false) // Finaliza el loading
      }
    }

    fetchData()
  }, [endPoint]) // Re-ejecutar si la URL cambia

  return { data, loading, error }
}

export default useGetFetch
