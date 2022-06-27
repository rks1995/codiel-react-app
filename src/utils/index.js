export * from './constant'

export const setItemInLocalStorage = (key, value) => {
  if (!key || !value) {
    console.error('Cannot set value in LS')
  }

  const valueToStore = typeof value !== 'string' ? JSON.stringify(value) : value

  localStorage.setItem(key, valueToStore)
}

export const getItemFromLocalStorage = (key) => {
  if (!key) {
    console.error('Cannot get value from LS')
  }

  return localStorage.getItem(key)
}

export const removeItemFromLocalStorage = (key) => {
  if (!key) {
    console.error('Cannot get value from LS')
  }

  localStorage.removeItem(key)
}

export const getFormBody = (params) => {
  let formBody = []

  for (let property in params) {
    let encodeKey = encodeURIComponent(property) // user name => user%20name
    let encodeValue = encodeURIComponent(params[property]) // ratna 123 => ratna%2020123

    formBody.push(encodeKey + '=' + encodeValue)
  }

  return formBody.join('&') // username=ratna&password=123
}
