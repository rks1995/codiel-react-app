import { useEffect } from 'react'
import { getPosts } from '../api'

function App() {
  useEffect(() => {
    async function fetchPost() {
      const response = await getPosts()
      console.log(response)
    }
    fetchPost()
  }, [])

  return (
    <div className='App'>
      <h1>Codial app</h1>
    </div>
  )
}

export default App
