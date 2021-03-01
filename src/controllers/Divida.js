const Divida = require('../models/Divida');
const UserController = require('./User');
const Home = require('./Home');
const { validationResult, matchedData } = require('express-validator');
const Functions = require('../utils/Functions')

exports.registerAction = async(req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        let errorMsg = "";
        for (let i in errors.mapped()) {
            errorMsg += `${errors.mapped()[i].msg},`;
        }

        errorMsg = errorMsg.trim();
        errorMsg = Functions.trimChar(errorMsg, ',');

        req.flash('error', errorMsg);

        return res.redirect('back');
    }
    // if (!errors.isEmpty()) {
    //     res.json({ error: errors.mapped() });
    //     return
    // }
    const data = matchedData(req);

    try {
        const novaDivida = new Divida(data);

        if (!await UserController.getUserById(data.idUser)) {
            await UserController.createUser(data.idUser.toString());
        }

        novaDivida.devedor = await UserController.getUserById(data.idUser)
        await novaDivida.save();
    } catch (error) {
        req.flash('error', 'Erro: ' + error.message);
        return res.redirect('/');
    }
    req.flash('success', 'Divida salva com sucesso')

    res.redirect('/');
}

exports.getDividas = async() => {
    const dividasPromise = await Divida.find().populate('devedor');
    let dividas = [];

    for (let i in dividasPromise) {
        dividas.push(dividasPromise[i]);
    }
    return dividas;
}

exports.getDividaById = async(req, res) => {
    const users = await UserController.getUsers();
    const dividas = await this.getDividas();
    const divida = await Divida.findOne({ seq: req.params.id }).populate('devedor')
    divida.dataFormatada = Functions.formatarDatas(divida);
    res.render('index', { users, dividas, divida })
}

exports.delete = async(req, res) => {
    await Divida.findOneAndDelete({ seq: req.params.id });
    req.flash('success', 'Divida deletada com sucesso')
    res.redirect('/');
}

exports.put = async(req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        let errorMsg = "";
        for (let i in errors.mapped()) {
            errorMsg += `${errors.mapped()[i].msg},`;
        }

        errorMsg = errorMsg.trim();
        errorMsg = Functions.trimChar(errorMsg, ',');

        req.flash('error', errorMsg);

        return res.redirect('back');
    }
    // if (!errors.isEmpty()) {
    //     res.json({ error: errors.mapped() });
    //     return
    // }
    const data = matchedData(req);
    const novaDivida = new Divida(data);
    let updates = {};
    updates.motivo = data.motivo;
    updates.valor = data.valor;
    updates.data = data.data;

    try {
        await Divida.findOneAndUpdate({ seq: data.seq }, { $set: updates });
    } catch (error) {
        req.flash('error', 'Erro: ' + error.message);
        return res.redirect('/');
    }
    req.flash('success', 'Divida salva com sucesso')

    res.redirect('back');
}

exports.getDividasFromUser = async(req, res) => {
    const users = await UserController.getUsers();
    const dividasPromise = await Divida.find({ devedor: await UserController.getUserById(req.params.id) }).populate('devedor');

    let dividas = [];

    for (let i in dividasPromise) {
        dividas.push(dividasPromise[i]);
    }
    return res.render('index', { users, dividas })
}