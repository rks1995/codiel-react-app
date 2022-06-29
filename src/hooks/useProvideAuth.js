import { useContext, useEffect, useState } from 'react'
import {
  editProfile,
  loginUser,
  signupUser,
  getUser,
  addFriend,
  fetchUserFriends,
  removeFriend,
} from '../api'
import { AuthContext } from '../providers/AuthProvider'
import jwtDecode from 'jwt-decode'

import {
  removeItemFromLocalStorage,
  setItemInLocalStorage,
  LOCALSTORAGE_TOKEN_KEY,
  getItemFromLocalStorage,
} from '../utils'

const useAuth = () => {
  return useContext(AuthContext)
}

const useProvideAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // set user from the token
  useEffect(() => {
    // console.log(typeof getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY))
    if (getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY) !== 'null') {
      getUserDetails()
    } else {
      console.log('useEffect')
      logout()
    }
    setLoading(false)
  }, [])

  const getUserDetails = async () => {
    console.log('call')
    const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY)
    if (userToken) {
      // decode the token
      const userInfo = jwtDecode(userToken)
      const response = await fetchUserFriends()
      let friends = []
      if (response.success) {
        friends = response.data.friends
      }
      setLoading(false)
      setUser({ ...userInfo, friends })
    } else {
      setUser(null)
    }
  }

  //  update user
  const updateUser = async (body) => {
    console.log(body)
    if (body.name === user.name || body.password === user.password) {
      return {
        success: true,
        message: 'Profile Update Successfully',
      }
    }
    const response = await editProfile(body)
    console.log('response', response)
    if (response.success) {
      // setUser(response.data.user)
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      )
      getUserDetails()
      return {
        success: true,
        message: 'Profile Updated Successfully!',
      }
    } else {
      return {
        success: false,
        message: 'Error In Updating profile',
      }
    }
  }

  const login = async (email, password) => {
    if (!email || !password) {
      return {
        success: false,
        message: 'Invalid email or password',
      }
    }

    try {
      const response = await loginUser(email, password)

      if (response.success) {
        // setUser(response.data.user)
        setItemInLocalStorage(
          LOCALSTORAGE_TOKEN_KEY,
          response.data.token ? response.data.token : null
        )
        getUserDetails()
        return {
          success: true,
          message: 'Successfully Logged In',
        }
      } else {
        return {
          success: false,
          message: 'Invalid email or password',
        }
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
      }
    }
  }

  const signup = async (body) => {
    const { name, email, password, confirmPassword } = body

    if (!name || !email || !password) {
      return {
        success: false,
        message: 'provide name email or password',
      }
    }
    if (password !== confirmPassword) {
      return {
        success: false,
        message: 'password does not match',
      }
    }

    try {
      const response = await signupUser(body)

      if (response.success) {
        return {
          success: true,
          message: 'successfully signed up',
        }
      }
      return {
        success: false,
        message: 'Invalid username or password',
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
      }
    }
  }

  const logout = () => {
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY)
    setUser(null)
  }

  const getUserInfo = async ({ userId }) => {
    try {
      const response = await getUser(userId)

      if (response.success) {
        return {
          success: true,
          user: response.data.user,
        }
      }
      return {
        success: false,
        message: response.message,
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
      }
    }
  }

  const updateFriendship = async (addingFriend, friend) => {
    const { friends } = user

    if (addingFriend) {
      // add a friend to the user list
      const response = await addFriend(friend._id)

      if (response.success) {
        setUser({
          ...user,
          friends: [...friends, response.data.friendship],
        })
        return {
          success: true,
        }
      }
      return {
        success: false,
      }
    } else {
      //removing the friend from the user list
      const response = await removeFriend(friend._id)

      let newFriends = []
      if (response.success) {
        newFriends = friends.filter((f) => f.to_user._id !== friend._id)
        setUser({
          ...user,
          friends: newFriends,
        })
        return {
          success: true,
        }
      }
      return {
        success: false,
      }
    }
  }

  return {
    user,
    loading,
    login,
    signup,
    logout,
    updateUser,
    getUserInfo,
    updateFriendship,
  }
}

export { useProvideAuth, useAuth }
