const User = require('../models/User');
const fetch = require('node-fetch');

exports.getUsers = async(req, res, next) => {
    let users = null;
    await fetch('https://jsonplaceholder.typicode.com/users')
        .then(responseJson => responseJson.json())
        .then(usersApi => users = usersApi);
    return users;
}

exports.createUser = async(idUser) => {
    const usuario = await new User(await this.getUserByIdFromApi(idUser));
    usuario.idApi = idUser
    await usuario.save();
    return usuario;
}

exports.getUserByIdFromApi = async(id) => {
    let user = null;
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(responseJson => responseJson.json())
        .then(userApi => user = userApi);
    return user;
}
exports.getUserById = async(idUser) => {
    return await User.findOne({ idApi: idUser.toString() });
}