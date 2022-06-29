import { API_URLS, LOCALSTORAGE_TOKEN_KEY, getFormBody } from '../utils'

const customFetch = async (url, { body, ...customConfig }) => {
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)

  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }

  if (body) {
    config.body = getFormBody(body)
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json()

    if (data.success) {
      return {
        data: data.data,
        success: true,
      }
    }

    throw new Error(data.message)
  } catch (error) {
    console.error('error')
    return {
      message: error.message,
      success: false,
    }
  }
}

const getPosts = (page = 1, limit = 3) => {
  const url = API_URLS.posts(page, limit)
  return customFetch(url, { method: 'get' })
}

const loginUser = (email, password) => {
  return customFetch(API_URLS.login(), {
    method: 'post',
    body: { email, password },
  })
}

const signupUser = (body) => {
  const { name, email, password, confirmPassword } = body
  return customFetch(API_URLS.signup(), {
    method: 'post',
    body: { name, email, password, confirm_password: confirmPassword },
  })
}

const editProfile = (body) => {
  const { userId, name, password, confirmPassword } = body
  return customFetch(API_URLS.editUser(), {
    method: 'post',
    body: { id: userId, name, password, confirm_password: confirmPassword },
  })
}

const getUser = (id) => {
  return customFetch(API_URLS.userInfo(id), {
    method: 'get',
  })
}
const fetchUserFriends = () => {
  return customFetch(API_URLS.friends(), {
    method: 'get',
  })
}
const addFriend = (userId) => {
  return customFetch(API_URLS.createFriendship(userId), {
    method: 'post',
  })
}
const removeFriend = (userId) => {
  return customFetch(API_URLS.removeFriend(userId), {
    method: 'post',
  })
}
const addPost = (content) => {
  return customFetch(API_URLS.createPost(), {
    method: 'post',
    body: { content },
  })
}

export {
  getPosts,
  loginUser,
  getUser,
  signupUser,
  editProfile,
  addFriend,
  fetchUserFriends,
  removeFriend,
  addPost,
}
