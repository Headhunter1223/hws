export const request = (url, method = 'GET', payload = {}) => {
  return fetch(`http://valerystatinov.com/${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Token: 'Token'
    },
    body: method !== 'GET' ? JSON.stringify(payload) : null
  })
}
