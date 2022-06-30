import { useAuth, usePosts } from '../hooks'
import { Post, CreatePost, Friendlist, Loader } from '../components'
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
          return <Post post={post} key={`post-${post._id}`} />
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
