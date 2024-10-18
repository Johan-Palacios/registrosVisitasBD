export const isAuthenticated = () => {
  const token = localStorage.getItem('token')

  if (!token) {
    return false
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const currentTime = Date.now() / 1000

    if (payload.exp < currentTime) {
      localStorage.removeItem('token')
      return false
    }

    return true
  } catch (error) {
    return false
  }
}
