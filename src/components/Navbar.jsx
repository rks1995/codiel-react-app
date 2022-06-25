import styles from '../styles/navbar.module.css'

const Navbar = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <a href=''>
          <img
            src='https://cdn-icons-png.flaticon.com/512/3600/3600912.png'
            alt='logo'
            className={styles.logoIcons}
          />
        </a>
        <span className={styles.logo}>Codial</span>
      </div>
      <div className={styles.rightNav}>
        <div className={styles.user}>
          <a href='/'>
            <img
              src='https://cdn-icons-png.flaticon.com/512/4825/4825044.png'
              alt='profile-pic'
              className={styles.userDp}
            />
          </a>
          <span>Ratna</span>
        </div>
        <div className={styles.navLinks}>
          <ul>
            <li>
              <a href='/'>Log In</a>
            </li>
            <li>
              <a href='/'>Log Out</a>
            </li>
            <li>
              <a href='/'>Register</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
