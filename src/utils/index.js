export * from './constant'

export const getFormBody = (params) => {
  let formBody = []

  for (let property in params) {
    let encodeKey = encodeURIComponent(property) // user name => user%20name
    let encodeValue = encodeURIComponent(params[property]) // ratna 123 => ratna%2020123

    formBody.push(encodeKey + '=' + encodeValue)
  }

  return formBody.join('&') // username=ratna&password=123
}
