import axios from 'axios'

const apiTask = axios.create({
  baseURL: 'http://localhost:5000/api/task',
})

apiTask.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

export default apiTask
