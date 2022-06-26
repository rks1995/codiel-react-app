import { API_URLS, LOCALSTORAGE_TOKEN_KEY, getFormBody } from '../utils'

const customFetch = async (url, { body, ...customConfig }) => {
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)

  const headers = {
    'content-json': 'application/x-www-form-urlencoded',
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

export { getPosts, loginUser }