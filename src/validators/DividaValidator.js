const { checkSchema } = require('express-validator');

module.exports = {
    registerAction: checkSchema({
        idUser: {
            notEmpty: true,
            errorMessage: 'Por favor, selecione um usuário'
        },
        motivo: {
            trim: true,
            notEmpty: true,
            errorMessage: 'Motivo precisa ser preenchido!'
        },
        valor: {
            notEmpty: true,
            errorMessage: 'Valor precisa ser preenchido!',
        },
        data: {
            notEmpty: true,
            errorMessage: 'Data precisa ser preenchida!'
        }
    }),
    put: checkSchema({
        seq: {
            notEmpty: true,
            errorMessage: 'Dívida não encontrada'
        },
        motivo: {
            trim: true,
            notEmpty: true,
            errorMessage: 'Motivo precisa ser preenchido!'
        },
        valor: {
            notEmpty: true,
            errorMessage: 'Valor precisa ser preenchido!',
        },
        data: {
            notEmpty: true,
            errorMessage: 'Data precisa ser preenchida!'
        }
    }),
}