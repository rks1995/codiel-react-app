import { useState } from 'react'
import styles from '../styles/home.module.css'
import { addPost } from '../api'
import toast from 'react-hot-toast'
import { usePosts } from '../hooks'

const CreatePost = () => {
  const posts = usePosts()
  const [post, setPost] = useState('')
  const [addingPost, setAddingPost] = useState(false)

  const handleAddPost = async () => {
    setAddingPost(true)
    const response = await addPost(post)
    if (response.success) {
      setPost('')
      posts.addPostToState(response.data.post)
      toast.success('Post Created!')
    } else {
      toast.error(response.message)
    }

    setAddingPost(false)
  }
  return (
    <div className={styles.createPost}>
      <textarea
        className={styles.addPost}
        value={post}
        onChange={(e) => setPost(e.target.value)}
      ></textarea>
      <div>
        <button
          className={styles.addPostBtn}
          onClick={handleAddPost}
          disabled={addingPost}
        >
          {addingPost ? 'Adding Post...' : 'Add Post'}
        </button>
      </div>
    </div>
  )
}

export default CreatePost
