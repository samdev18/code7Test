const Divida = require('../models/Divida');
const UserController = require('../controllers/User');
const { validationResult, matchedData } = require('express-validator');
const Functions = require('../utils/Functions')

exports.getDividas = async(req, res) => {
    const dividasPromise = await Divida.find().populate('devedor');

    let dividas = [];

    for (let i in dividasPromise) {
        dividas.push(dividasPromise[i]);
    }
    dividas = dividas.map((item) => ({...item._doc, valor: Number(item.valor).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }).toString() }));

    res.json({ dividas })

}
exports.getDividaById = async(req, res) => {
    const divida = await Divida.findOne({ seq: req.params.id }).populate('devedor')
    if (divida) {

        divida.dataFormatada = Functions.formatarDatas(divida)
        divida.valor = Number(divida.valor).toLocaleString('pt-br', { minimumFractionDigits: 2 }).toString();

        res.json({ divida });
    } else {
        res.json({
            error: 'Dívida não encontrada'
        })
    }
    return;
}

exports.registerAction = async(req, res) => {
    const errors = validationResult(req);
    // console.log(req)
    if (!errors.isEmpty()) {
        return res.json({ error: errors.mapped() });
    }
    const data = matchedData(req);

    try {
        const novaDivida = await new Divida(data);

        if (!await UserController.getUserById(data.idUser)) {
            await UserController.createUser(data.idUser.toString());
        }

        novaDivida.devedor = await UserController.getUserById(data.idUser)
        await novaDivida.save();
    } catch (error) {
        console.log(error)
        return res.json({
            status: 'error',
            msg: error
        })
    }
    return res.json({
        status: 'success',
        msg: 'Dívida criada com sucesso!'
    })
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
        return res.json({
            status: 'error',
            msg: errorMsg
        })
    }

    const data = matchedData(req);
    const novaDivida = new Divida(data);
    let updates = {};
    updates.motivo = data.motivo;
    updates.valor = data.valor;
    updates.data = data.data;

    try {
        await Divida.findOneAndUpdate({ seq: data.seq }, { $set: updates });
        res.json({
            status: 'success',
            msg: 'Divida atualizada co sucesso'
        })
    } catch (error) {
        res.json({
            status: 'error',
            msg: error.message
        })
    }
}

exports.getDividasFromUser = async(req, res) => {
    const dividasPromise = await Divida.find({ devedor: await UserController.getUserById(req.params.id) }).populate('devedor');

    let dividas = [];

    for (let i in dividasPromise) {
        dividas.push(dividasPromise[i]);
    }
    if (dividas) {
        res.json({ dividas })
    } else {
        res.json({})
    }
}

exports.delete = async(req, res) => {
    try {
        await Divida.findOneAndDelete({ seq: req.params.id });
        res.json({
            status: 'success',
            msg: 'Divida deletada comm sucesso'
        })
    } catch (error) {
        res.json({
            status: 'error',
            msg: error.message
        })
    }
}