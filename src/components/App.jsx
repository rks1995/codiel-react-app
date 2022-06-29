import { Home, Login, Settings } from '../pages'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Loader, Navbar } from './'
import { useAuth } from '../hooks'
import { Register, UserProfile } from '../pages'
import PrivateRoute from '../routes/PrivateRoute'

const Page404 = () => {
  return <div>page404</div>
}

function App() {
  const auth = useAuth()
  if (auth.loading) {
    return <Loader />
  }

  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/settings'
            element={<PrivateRoute children={<Settings />} />}
          />
          <Route
            path='/user/:userId'
            element={<PrivateRoute children={<UserProfile />} />}
          />
          <Route path='*' element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
