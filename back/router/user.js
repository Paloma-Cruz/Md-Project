const express = require('express');
const router = express.Router();
const User = require('../model/user');

router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        return res.send(users); 
    } catch (error) {
        return res.send({ error: 'Erro ao buscar usuários!' });
    }
});

router.post('/create', async (req, res) => {
    const { email, password, name, phone, super_admin, excluded } = req.body;
    if(!email || !name ) return res.send({ message: 'Dados insuficientes! '});
    
    try {
        if(await User.findOne({email})) return res.send({ message: 'Usuário já cadastrado! '});

        if(!phone) req.body.phone = null;

        if(!super_admin) req.body.super_admin = false;
        
        req.body.password = '123456';
        req.body.excluded = false;
        const user = await User.create(req.body);
        user.password = undefined;
        return res.send(user);
    } catch (error) {
        return res.send({ error: 'Erro ao cadastrar ou buscar usuário!' });
    }
});

module.exports = router;
