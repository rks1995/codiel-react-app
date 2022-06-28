import styles from '../styles/login.module.css'
import { useFormInput } from '../hooks'
import { useState } from 'react'
import { useAuth } from '../hooks'
import toast from 'react-hot-toast'
import { Navigate } from 'react-router-dom'

const Login = () => {
  const email = useFormInput('')
  const password = useFormInput('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const auth = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoggedIn(true)

    const response = await auth.login(email.value, password.value)

    if (response.success) {
      toast.success(response.message)
    } else {
      toast.error(response.message)
    }
    setIsLoggedIn(false)
  }

  if (auth.user) {
    return <Navigate to='/' />
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Login</span>
      <div className={styles.field}>
        <input type='email' name='email' {...email} placeholder='email' />
      </div>
      <div className={styles.field}>
        <input
          type='password'
          name='password'
          {...password}
          placeholder='password'
        />
      </div>
      <div className={styles.field}>
        <button disabled={isLoggedIn}>
          {isLoggedIn ? 'Logging in...' : 'Log In'}
        </button>
      </div>
    </form>
  )
}

export default Login
