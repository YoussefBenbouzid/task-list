const express = require('express')
const Utente = require('../models/utenteModel.js')

const taskRoute = express.Router()

// Da sostituire a routes/utenteRoute/createUtente
router.post('/register', async (req, res) => {
    try {
        const { nomeUtente, email, password, foto } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const Utente = new Utente({ nomeUtente, password: hashedPassword, email, foto });
        await Utente.save();

        res.status(200).json({ message: "Utente registrato con successo." })

    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
    });

router.post('/login', async (req, res) => {
    try {
        const { nomeUtente, password } = req.body;
        const utente = await Utente.findOne({ nomeUtente });
        if (!user) {
            return res.status(401).json({ error: 'Accesso non riuscito' });
        }
        const passwordMatch = await bcrypt.compare(password, utente.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Accesso non riuscito' });
        }
        const token = jwt.sign({ utenteId: utente.id }, 'secretKey', {
        expiresIn: '1h',
        });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Accesso non riuscito' });
    }
});