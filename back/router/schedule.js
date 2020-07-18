const express = require('express');
const router = express.Router();
const Schedule = require('../model/schedule');

router.get('/', async (req, res) => {
    try {
        const schedule = await Schedule.find({});
        return res.send(schedule);
    } catch (error) {
        return res.send({ error: 'Erro ao buscar agendas!' });
    }
});

router.post('/create', async (req, res) => {
    const { client, data, price } = req.body;
    if(!client || !data) return res.send({ error: 'Dados insuficientes!' });

    try {
        // Pensar na regra de negócio daqui
    } catch (error) {
        return res.send({ error: 'Erro ao cadastrar ou buscar agenda!' });
    }
})

module.exports = router;