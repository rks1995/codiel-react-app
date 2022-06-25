import { useEffect, useState } from 'react'
import { getPosts } from '../api'
import { Home } from '../pages'
import Loader from './Loader'

function App() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchPost() {
      const response = await getPosts()
      setPosts(response.data)
      setLoading(false)
    }
    fetchPost()
  }, [])

  if (loading) {
    return <Loader />
  }
  return (
    <div className='App'>
      <h1>Codial app</h1>
      <Home posts={posts.posts} />
    </div>
  )
}

export default App
