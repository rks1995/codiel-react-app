import { useState } from 'react'
import { Comments } from './'
import { Link } from 'react-router-dom'
import { addComment, toggleLikes } from '../api'
import toast from 'react-hot-toast'
import styles from '../styles/home.module.css'
import { usePosts, useAuth } from '../hooks'

const Post = ({ post }) => {
  const [commentText, setCommentText] = useState('')
  const [commentInProgess, setCommentInProgress] = useState(false)
  const posts = usePosts()
  const auth = useAuth()

  const handleComment = async (e) => {
    if (e.key === 'Enter') {
      setCommentInProgress(true)
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
    setCommentInProgress(false)
  }

  const likePost = async () => {
    console.log('toggleLike')

    const response = await toggleLikes(post._id, 'Post')
    console.log(response)
    if (response.success) {
      if (response.data.deleted) {
        posts.updatePostLikesToState(post._id, auth.user._id, true)
        toast.success('Post disliked !', {
          icon: '👎',
        })
        return
      }
      posts.updatePostLikesToState(post._id, auth.user._id, false)
      toast.success('Post Liked!', {
        icon: '👍',
      })
    } else {
      toast.error(response.message)
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
              onClick={likePost}
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
            disabled={commentInProgess}
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
