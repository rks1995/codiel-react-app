import { useContext, useEffect, useState } from 'react'
import { loginUser, signupUser } from '../api'
import { AuthContext } from '../providers/AuthProvider'
import jwtDecode from 'jwt-decode'

import {
  removeItemFromLocalStorage,
  setItemInLocalStorage,
  LOCALSTORAGE_TOKEN_KEY,
  getItemFromLocalStorage,
} from '../utils'

const useAuth = () => {
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
    if (!email || !password) {
      return {
        success: false,
        message: 'Invalid email or password',
      }
    }

    try {
      const response = await loginUser(email, password)

      if (response.success) {
        setUser(response.data.user)
        setItemInLocalStorage(
          LOCALSTORAGE_TOKEN_KEY,
          response.data.token ? response.data.token : null
        )
        return {
          success: true,
          message: 'Successfully Logged In',
        }
      } else {
        return {
          success: false,
          message: 'Invalid email or password',
        }
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
      }
    }
  }

  const signup = async (body) => {
    const { name, email, password, confirmPassword } = body

    if (!name || !email || !password) {
      return {
        success: false,
        message: 'provide name email or password',
      }
    }
    if (password !== confirmPassword) {
      return {
        success: false,
        message: 'password does not match',
      }
    }

    try {
      const response = await signupUser(body)

      if (response.success) {
        return {
          success: true,
          message: 'successfully signed up',
        }
      }
      return {
        success: false,
        message: 'Invalid username or password',
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
      }
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
    signup,
    logout,
  }
}

export { useProvideAuth, useAuth }
