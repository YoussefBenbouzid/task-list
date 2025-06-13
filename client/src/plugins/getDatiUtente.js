import { jwtDecode } from 'jwt-decode'

const getDatiUtente = () => {
  const token = localStorage.getItem('token')
  if (!token) return null

  const decoded = jwtDecode(token)
  if (!decoded) return null

  const nomeUtente = decoded.nomeUtente
  const email = decoded.email
  const foto = decoded.foto
  const utenteId = decoded.id

  return {
    nomeUtente,
    email,
    foto,
    utenteId,
  }
}

export { getDatiUtente }
