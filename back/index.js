const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const url = 'mongodb+srv://usuario_admin:Palomaperes2@api-md-project.x2cdx.mongodb.net/<dbname>?retryWrites=true&w=majority';
const options =  { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true };

mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
    console.log('\nErro na conexão com o banco de dados: ' + err); 
});

mongoose.connection.on('disconnected', () => {
    console.log('\nAplicação desconectada do banco de dados!');
});

mongoose.connection.on('connected', () => {
    console.log('\nAplicação conectada ao banco de dados!');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const indexRoute = require('./router/index');
const userRoute = require('./router/user');
const serviceRoute = require('./router/service');

app.use('/', indexRoute);
app.use('/user', userRoute);
app.use('/service', serviceRoute);

app.listen(8000);
console.log('Api rodando na porta 8000');

module.exports = app;
