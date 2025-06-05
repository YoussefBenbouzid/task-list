const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.status(401).json({ message: 'Accesso negato. Token mancante.' })

    jwt.verify(token, process.env.SECRET_KEY, (error, utente) => {
        if (error) return res.status(403).json({ message: 'Token non valido.' })
        req.utente = utente
        next()
    })
}

module.exports = verifyToken