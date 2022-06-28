import styles from '../styles/home.module.css'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Comments = ({ comment }) => {
  return (
    <div className={styles.postCommentsItem}>
      <div className={styles.postCommentHeader}>
        <Link
          to={`/user/${comment.user._id}`}
          className={styles.postCommentAuthor}
        >
          {comment.user.name}
        </Link>
        <span className={styles.postCommentTime}>a minute ago</span>
        <span className={styles.postCommentLikes}>{comment.likes.length}</span>
      </div>
      <div className={styles.postCommentContent}>{comment.content}</div>
    </div>
  )
}

Comments.propTypes = {
  comment: PropTypes.object.isRequired,
}

export default Comments
