import styles from '../styles/settings.module.css'
import { useAuth } from '../hooks'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Loader } from '../components'
import toast from 'react-hot-toast'

const UserProfile = () => {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  const [requestInProgress, setRequestInProgress] = useState(false)
  const navigate = useNavigate()
  const userId = useParams()
  const auth = useAuth()

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
    const { friends } = auth.user

    const friendIds = friends.map((friend) => friend.to_user._id)

    const index = friendIds.indexOf(userId.userId) // userId={userId: 2323jkjkjdoi32}

    if (index !== -1) return true // user is a friend

    return false
  }

  const showAddFriendBtn = checkIfUserIsAFriend()

  const updateFriend = async (addFriend) => {
    setRequestInProgress(true)
    const response = await auth.updateFriendship(addFriend, user)

    if (response.success) {
      if (addFriend) {
        toast.success('Added friend successfully')
      } else {
        toast.success('Removed friend Successfully')
      }
    } else {
      toast.error(response.message)
    }
    setRequestInProgress(false)
  }

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
          <button
            onClick={() => updateFriend(false)}
            className={`button ${styles.editBtn}`}
            disabled={requestInProgress}
          >
            {requestInProgress ? 'Removing Friend...' : 'Remove Friend'}
          </button>
        ) : (
          <button
            onClick={() => updateFriend(true)}
            className={`button ${styles.editBtn}`}
            disabled={requestInProgress}
          >
            {requestInProgress ? 'Adding Friend...' : 'Add Friend'}
          </button>
        )}
      </div>
    </div>
  )
}

export default UserProfile
