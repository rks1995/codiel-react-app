import { useContext, useState } from 'react'
import { loginUser } from '../api'
import { AuthContext } from '../providers/AuthProvider'

export const useAuth = () => {
  return useContext(AuthContext)
}

const useProvideAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const login = async (email, password) => {
    const response = await loginUser(email.value, password.value)

    if (response.success) {
      setUser(response.data.user)
      setLoading(false)
      return {
        success: true,
      }
    }
    return {
      success: false,
      message: response.message,
    }
  }
  const logout = () => {
    setUser(null)
  }

  return {
    user,
    loading,
    login,
    logout,
  }
}

export default useProvideAuth
