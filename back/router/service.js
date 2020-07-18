const express = require('express');
const router = express.Router();
const Service = require('../model/service');

router.get('/', async (req, res) => {
    try {
        const services = await Service.find({});
        return res.send(services);
    } catch (error) {
        return res.send({ error: 'Erro ao buscar serviços!' });
    }
});

router.post('/create', async(req, res) => {
    const { name, price, excluded } = req.body;
    if(!name || !price) return res.send({ error: 'Dados insuficientes!' });

    try {
        if(await Service.findOne({name})) return res.send({ error: 'Serviço já cadastrado!' });
        
        req.body.excluded = false;
        const service = await Service.create(req.body);
        return res.send(service);
    } catch (error) {
        return res.send({ error: 'Erro ao cadastrar ou buscar serviço!' });
    }
});

module.exports = router;