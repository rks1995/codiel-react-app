import styles from '../styles/login.module.css'

const Login = () => {
  return (
    <form action='' className={styles.loginForm}>
      <span className={styles.loginSignupHeader}>Login</span>
      <div className={styles.field}>
        <input type='email' name='' placeholder='email' required />
      </div>
      <div className={styles.field}>
        <input type='password' name='' placeholder='password' required />
      </div>
      <div className={styles.field}>
        <button>Login</button>
      </div>
    </form>
  )
}

export default Login
