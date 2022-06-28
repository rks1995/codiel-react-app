import { createContext } from 'react'
import { useProvideAuth } from '../hooks'

const initialState = {
  user: null,
  login: () => {},
  logout: () => {},
  signup: () => {},
  updateUser: () => {},
  loading: true,
}

const AuthContext = createContext(initialState)

const AuthProvider = ({ children }) => {
  const auth = useProvideAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
