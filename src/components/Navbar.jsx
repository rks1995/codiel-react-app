import styles from '../styles/navbar.module.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks'

const Navbar = () => {
  const auth = useAuth()
  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to='/'>
          <img
            src='https://cdn-icons-png.flaticon.com/512/3600/3600912.png'
            alt='logo'
            className={styles.logoIcons}
          />
        </Link>
        <span className={styles.logo}>Codial</span>
      </div>
      <div className={styles.rightNav}>
        {auth.user && (
          <div className={styles.user}>
            <Link to='/settings'>
              <img
                src='https://cdn-icons-png.flaticon.com/512/4825/4825044.png'
                alt='profile-pic'
                className={styles.userDp}
              />
            </Link>
            <span>{auth.user.name}</span>
          </div>
        )}

        <div className={styles.navLinks}>
          <ul>
            {auth.user ? (
              <>
                <li>
                  <Link to='/logout' onClick={() => auth.logout()}>
                    Log Out
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to='/login'>Log In</Link>
                </li>

                <li>
                  <Link to='/register'>Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
