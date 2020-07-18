const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        return res.send(users); 
    } catch (error) {
        return res.send({ error: 'Erro ao buscar usuários!' });
    }
});

router.post('/create', async (req, res) => {
    const { email, name, phone, super_admin } = req.body;
    if(!email || !name ) return res.send({ error: 'Dados insuficientes! '});
    
    try {
        if(await User.findOne({email})) return res.send({ error: 'Usuário já cadastrado! '});

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

router.post('/auth', async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) return res.send({ error: 'Dados insuficientes!'});

    try {
        const user = await User.findOne({email}).select('+password');
        if(!user) return res.send({ error: 'Usuário não cadastrado!' });
        
        const pass_ok = await bcrypt.compare(password, user.password);
        if(!pass_ok) return res.send({ error: 'Erro ao autenticar usuário' });

        user.password = undefined;
        return res.send({ message: 'Permissão liberada!' });
    } catch (error) {
        return res.send({ error: "Erro na conexão com o servidor!" });
    }
});

module.exports = router;
