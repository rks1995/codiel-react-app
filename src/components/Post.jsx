import { useState } from 'react'
import { Comments } from './'
import { Link } from 'react-router-dom'
import { addComment } from '../api'
import toast from 'react-hot-toast'
import styles from '../styles/home.module.css'
import { usePosts } from '../hooks'

const Post = ({ post }) => {
  const [commentText, setCommentText] = useState('')
  const posts = usePosts()

  const handleComment = async (e) => {
    if (e.key === 'Enter') {
      console.log('handle...')
      const response = await addComment(commentText, post._id)
      console.log(response)
      if (response.success) {
        setCommentText('')
        posts.addCommentsToState(response.data.comment, post._id)
        toast.success('Comments Added!')
      } else {
        toast.error(response.message)
      }
    }
  }

  return (
    <div key={post._id} className={styles.postWrapper}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img
            src='https://cdn-icons-png.flaticon.com/512/4825/4825038.png'
            alt='user-pic'
          />
          <div>
            <Link to={`/user/${post.user._id}`} className={styles.postAuthor}>
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
          <input
            placeholder='Start typing a comment'
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyUp={handleComment}
          />
        </div>
        <div className={styles.postCommentsList}>
          {post.comments.map((comment) => {
            return <Comments key={comment._id} comment={comment} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Post
