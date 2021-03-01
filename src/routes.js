const express = require('express');

const router = express.Router();
const User = require('./controllers/User');
const Divida = require('./controllers/Divida');
const Home = require('./controllers/Home');
const DividaValidator = require('./validators/DividaValidator');
const DividaApi = require('./api/Divida');

router.get('/', Home.index);
//Cadastrar divida
router.post('/divida/register', DividaValidator.registerAction, Divida.registerAction);
//Buscar divida por ID
router.get('/divida/:id', Divida.getDividaById);
//Atualizar dados e divida
router.post('/divida/:id', DividaValidator.put, Divida.put);
//Deletar Divida
router.get('/divida/delete/:id', Divida.delete);
//Buscar divida pelo id do usuário
router.get('/user/:id/dividas', Divida.getDividasFromUser);

//Buscar Dividas 
router.get('/api/dividas', DividaApi.getDividas);
//Cadastrar dividas
router.post('/api/dividas', DividaValidator.registerAction, DividaApi.registerAction);
//Atualizar divida
router.put('/api/divida/:seq', DividaValidator.put, DividaApi.put);
//Deletar divida
router.delete('/api/divida/:id', DividaApi.delete)
    //Buscar divida por API
router.get('/api/divida/:id', DividaApi.getDividaById);
//Buscar divida pelo id do usuário na API
router.get('/api/user/:id/dividas', DividaApi.getDividasFromUser);

module.exports = router;