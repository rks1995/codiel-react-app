import { useContext, useEffect, useState } from 'react'
import { loginUser } from '../api'
import { AuthContext } from '../providers/AuthProvider'
import jwtDecode from 'jwt-decode'

import {
  removeItemFromLocalStorage,
  setItemInLocalStorage,
  LOCALSTORAGE_TOKEN_KEY,
  getItemFromLocalStorage,
} from '../utils'

export const useAuth = () => {
  return useContext(AuthContext)
}

const useProvideAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // set user from the token
  useEffect(() => {
    const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY)

    if (userToken) {
      // decode the token
      const userInfo = jwtDecode(userToken)
      setUser(userInfo)
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const response = await loginUser(email.value, password.value)

    if (response.success) {
      setUser(response.data.user)
      setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY, response.data.token && null)
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
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY)
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
