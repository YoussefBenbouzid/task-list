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
  console.error(error)
  return Promise.reject(error)
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        localStorage.clear()
        router.push('/login')
      }
    }
    return Promise.reject(error)
  }
)

export default api
