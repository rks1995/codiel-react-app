import { useEffect, useState } from 'react'
import { getPosts } from '../api'
import { Home } from '../pages'
import { Loader, Navbar } from './'

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
      <Navbar />
      <Home posts={posts.posts} />
    </div>
  )
}

export default App
