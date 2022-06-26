import { useEffect, useState } from 'react'
import { getPosts } from '../api'
import { Home, Login } from '../pages'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Loader, Navbar } from './'

const Page404 = () => {
  return <div>page404</div>
}

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
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home posts={posts.posts} />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
