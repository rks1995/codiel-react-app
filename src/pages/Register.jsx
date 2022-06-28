import styles from '../styles/login.module.css'
import { useFormInput } from '../hooks'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useAuth } from '../hooks'
import { Navigate, useNavigate } from 'react-router-dom'

const Register = () => {
  const name = useFormInput('')
  const email = useFormInput('')
  const password = useFormInput('')
  const confirm_password = useFormInput('')
  const [isRegistered, setIsRegistered] = useState(false)
  const auth = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsRegistered(true)

    const body = {
      name: name.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirm_password.value,
    }

    const response = await auth.signup(body)

    if (response.success) {
      navigate('/login')
      toast.success(response.message)
    } else {
      toast.error(response.message)
    }
    setIsRegistered(false)
  }

  if (auth.user) {
    return <Navigate to='/' />
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Register</span>
      <div className={styles.field}>
        <input type='text' {...name} placeholder='username' />
      </div>
      <div className={styles.field}>
        <input type='email' {...email} placeholder='email' />
      </div>
      <div className={styles.field}>
        <input type='password' {...password} placeholder='password' />
      </div>
      <div className={styles.field}>
        <input
          type='password'
          {...confirm_password}
          placeholder='confirm password'
        />
      </div>
      <div className={styles.field}>
        <button disabled={isRegistered}>
          {isRegistered ? 'Signing Up...' : 'Sign Up'}
        </button>
      </div>
    </form>
  )
}

export default Register
