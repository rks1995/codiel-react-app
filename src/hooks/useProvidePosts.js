import { useContext, useEffect, useState } from 'react'
import { getPosts } from '../api'
import { PostContext } from '../providers'

const usePosts = () => {
  return useContext(PostContext)
}

const useProvidePosts = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPost() {
      const response = await getPosts()
      setPosts(response.data.posts)
      setLoading(false)
    }
    fetchPost()
  }, [])

  const addPostToState = (post) => {
    setPosts([post, ...posts])
    setLoading(false)
  }

  return {
    data: posts,
    loading,
    addPostToState,
  }
}

export { useProvidePosts, usePosts }
