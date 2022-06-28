import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks'

function PrivateRoute({ children }) {
  const auth = useAuth()
  return auth.user ? children : <Navigate to='/login' />
}

export default PrivateRoute
