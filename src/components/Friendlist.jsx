import { Link } from 'react-router-dom'
import { useAuth } from '../hooks'
import styles from '../styles/home.module.css'

const Friendlist = () => {
  const auth = useAuth()
  console.log(auth)
  const { friends = [] } = auth.user
  return (
    <div className={styles.friendsList}>
      <div className={styles.header}>Friends</div>

      {friends && friends.length === 0 && (
        <div className={styles.nofriends}>No friends found</div>
      )}

      {friends &&
        friends.map((friend) => {
          return (
            <div key={`friend-${friend._id}`}>
              <Link to={`/user/${friend._id}`} className={styles.friendsItem}>
                <div className={styles.friendsImg}>
                  <img
                    src='https://cdn-icons-png.flaticon.com/512/4825/4825038.png'
                    alt='friendProfilePhoto'
                  />
                </div>
                <div className={styles.friendsName}>{friend.to_user.email}</div>
              </Link>
            </div>
          )
        })}
    </div>
  )
}

export default Friendlist
