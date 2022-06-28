import styles from '../styles/settings.module.css'
import { useAuth } from '../hooks'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Loader } from '../components'
import toast from 'react-hot-toast'

const UserProfile = () => {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const userId = useParams()
  const auth = useAuth()
  console.log(auth)
  useEffect(() => {
    const getUser = async () => {
      const response = await auth.getUserInfo(userId)
      if (response.success) {
        setUser(response.user)
      } else {
        toast.error(response.message)
        navigate('/')
      }
      setLoading(false)
    }
    getUser()
  }, [userId, auth, navigate])

  if (loading) {
    return <Loader />
  }

  const checkIfUserIsAFriend = () => {
    const friends = auth.user.friendships

    const index = friends.indexOf(userId.userId)

    if (index !== -1) return true // user is a friend

    return false
  }

  const showAddFriendBtn = checkIfUserIsAFriend()

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
        {showAddFriendBtn ? (
          <button className={`button ${styles.editBtn}`}>Remove Friend</button>
        ) : (
          <button className={`button ${styles.editBtn}`}>Add Friend</button>
        )}
      </div>
    </div>
  )
}

export default UserProfile
