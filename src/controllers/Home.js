const User = require('./User')
const Divida = require('./Divida')

exports.index = async(req, res) => {
    const users = await User.getUsers();
    const dividas = await Divida.getDividas();

    res.render('index', { users, dividas })
}