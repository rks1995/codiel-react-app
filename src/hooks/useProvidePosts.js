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

  const addCommentsToState = (comment, postId) => {
    const newPosts = posts.map((post) => {
      if (post._id === postId) {
        return { ...post, comments: [...post.comments, comment] }
      }
      return post
    })
    setPosts(newPosts)
    setLoading(false)
  }
  const updatePostLikesToState = (postId, userId, deleted) => {
    let newPosts = []
    if (deleted) {
      newPosts = posts.map((post) => {
        if (post._id === postId) {
          console.log(userId)
          let newLikes = post.likes.filter((user) => user !== userId)
          return { ...post, likes: newLikes }
        }
        return post
      })
      console.log(newPosts)
    } else {
      newPosts = posts.map((post) => {
        if (post._id === postId) {
          return { ...post, likes: [...post.likes, userId] }
        }
        return post
      })
    }

    setPosts(newPosts)
  }

  return {
    data: posts,
    loading,
    addPostToState,
    addCommentsToState,
    updatePostLikesToState,
  }
}

export { useProvidePosts, usePosts }
