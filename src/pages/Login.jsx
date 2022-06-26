import styles from '../styles/login.module.css'
import { useFormInput } from '../hooks'
import { useState } from 'react'
import toast from 'react-hot-toast'

const Login = () => {
  const email = useFormInput('')
  const password = useFormInput('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email.value || !password.value) {
      return toast.error('Invalid credential')
    }
    setIsLoggedIn(true)
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
        <button>{isLoggedIn ? 'Logging in...' : 'Log In'}</button>
      </div>
    </form>
  )
}

export default Login
