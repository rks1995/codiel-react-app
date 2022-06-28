import styles from '../styles/settings.module.css'
import { useAuth } from '../hooks'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const UserProfile = () => {
  const params = useParams()
  const auth = useAuth()
  const [user, setUser] = useState({})

  useEffect(() => {
    const getUser = async () => {
      const response = await auth.getUserInfo(params.userId)
      if (response.success) {
        setUser(response.user)
      } else {
        setUser({})
      }
    }
    getUser()
  }, []) // eslint-disable-next-line

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src='https://cdn-icons-png.flaticon.com/512/4825/4825044.png'
          alt='profile'
        />
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        <div className={styles.fieldValue}>{user.name}</div>
      </div>
      <div className={styles.btnGrp}>
        <button className={`button ${styles.editBtn}`}>Add Friend</button>
        <button className={`button ${styles.editBtn}`}>Remove Friend</button>
      </div>
    </div>
  )
}

export default UserProfile
