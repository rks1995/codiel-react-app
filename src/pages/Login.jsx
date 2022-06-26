import styles from '../styles/login.module.css'
import { useFormInput } from '../hooks'
import { useState } from 'react'
import { useAuth } from '../hooks/useProvideAuth'
import toast from 'react-hot-toast'

const Login = () => {
  const email = useFormInput('')
  const password = useFormInput('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const auth = useAuth()
  console.log(auth)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoggedIn(true)
    if (!email.value || !password.value) {
      return toast.error('Invalid credential')
    }
    const response = await auth.login(email.value, password.value)

    if (response.success) {
      toast.success(response.message)
    } else {
      toast.error(response.message)
    }
    setIsLoggedIn(false)
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
