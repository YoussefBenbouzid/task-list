import axios from 'axios'
import router from '@/router'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const status = error.response.status
      if (status === 401 || status === 403) {
        localStorage.clear()
        alert('Sessione scaduta, effettua il login di nuovo.')
        router.push('/login')
      }
    }
    return Promise.reject(error)
  }
)

export default api
