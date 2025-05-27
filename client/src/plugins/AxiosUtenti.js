import axios from 'axios'

const apiUtenti = axios.create({
  baseURL: 'http://localhost:5000/api/utenti',
})

export default apiUtenti
