import { useAuth, usePosts } from '../hooks'
import { Link } from 'react-router-dom'
import { CreatePost, Comments, Friendlist, Loader } from '../components'

import styles from '../styles/home.module.css'
import PropTypes from 'prop-types'

const Home = () => {
  const posts = usePosts()
  const auth = useAuth()

  if (posts.loading) {
    return <Loader />
  }

  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        <CreatePost />
        {posts.data.map((post) => {
          return (
            <div key={post._id} className={styles.postWrapper}>
              <div className={styles.postHeader}>
                <div className={styles.postAvatar}>
                  <img
                    src='https://cdn-icons-png.flaticon.com/512/4825/4825038.png'
                    alt='user-pic'
                  />
                  <div>
                    <Link
                      to={`/user/${post.user._id}`}
                      className={styles.postAuthor}
                    >
                      {post.user.name}
                    </Link>
                    <span className={styles.postTime}>a minute ago</span>
                  </div>
                </div>
                <div className={styles.postContent}>{post.content}</div>

                <div className={styles.postActions}>
                  <div className={styles.postLike}>
                    <img
                      src='https://cdn-icons-png.flaticon.com/512/1077/1077035.png'
                      alt='likes-icon'
                    />
                    <span>{post.likes.length}</span>
                  </div>

                  <div className={styles.postCommentsIcon}>
                    <img
                      src='https://cdn-icons-png.flaticon.com/512/1380/1380338.png'
                      alt='comments-icon'
                    />
                    <span>{post.comments.length}</span>
                  </div>
                </div>
                <div className={styles.postCommentBox}>
                  <input placeholder='Start typing a comment' />
                </div>

                <div className={styles.postCommentsList}>
                  {post.comments.map((comment) => {
                    return <Comments key={comment._id} comment={comment} />
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {auth.user && <Friendlist />}
    </div>
  )
}

Home.propTypes = {
  posts: PropTypes.array,
}

export default Home
