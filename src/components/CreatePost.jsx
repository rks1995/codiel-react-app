import { useState } from 'react'
import styles from '../styles/home.module.css'

const CreatePost = () => {
  const [post, setPost] = useState('')
  const [addingPost, setAddingPost] = useState(false)

  return (
    <div className={styles.createPost}>
      <textarea
        className={styles.addPost}
        value={post}
        onChange={(e) => setPost(e.target.value)}
      ></textarea>
      <div>
        <button className={styles.addPostBtn} disabled={addingPost}>
          {addingPost ? 'Adding Post...' : 'Add Post'}
        </button>
      </div>
    </div>
  )
}

export default CreatePost
