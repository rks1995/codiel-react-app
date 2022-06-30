import { createContext } from 'react'
import { useProvidePosts } from '../hooks'

const initialState = {
  posts: [],
  loading: true,
  addPostToState: () => {},
  addCommentsToState: () => {},
}

const PostContext = createContext(initialState)

const PostsProvider = ({ children }) => {
  const posts = useProvidePosts()
  return <PostContext.Provider value={posts}>{children}</PostContext.Provider>
}

export { PostContext, PostsProvider }
