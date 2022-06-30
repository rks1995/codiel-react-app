import styles from '../styles/navbar.module.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks'
import { useEffect, useState } from 'react'
import { searchUsers } from '../api'

const Navbar = () => {
  const auth = useAuth()
  const [searchInput, setSearchInput] = useState('')
  const [result, setResult] = useState([])

  useEffect(() => {
    const handleSearch = async () => {
      if (!searchInput) {
        setResult([])
        return
      }
      const response = await searchUsers(searchInput)
      if (response.success) {
        setResult(response.data.users)
      } else {
        setResult([])
      }
    }
    handleSearch()
  }, [searchInput])

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
      <div className={styles.searchContainer}>
        <img
          className={styles.searchIcon}
          src='https://cdn-icons-png.flaticon.com/512/54/54481.png'
          alt='searchIcon'
          // onClick={handleSearch}
        />
        <input
          type='text'
          placeholder='Search users'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        {result.length > 0 && (
          <div className={styles.searchResults}>
            <ul>
              {result.map((user) => {
                return (
                  <li className={styles.searchResultsRow} key={user._id}>
                    <Link to={`/user/${user._id}`}>
                      <img
                        src='https://cdn-icons-png.flaticon.com/512/4825/4825044.png'
                        alt=''
                      />
                      <span>{user.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
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
                  <Link to='/login' onClick={() => auth.logout()}>
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
