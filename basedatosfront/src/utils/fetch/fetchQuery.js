const fetchQuery = async (endPoint, data) => {
  const token = localStorage.getItem('token')

  try {
    const response = await fetch(endPoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.log('falle xd')
  }
}
export default fetchQuery
