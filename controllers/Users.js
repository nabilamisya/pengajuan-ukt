const User = require("../models/UserModel.js");
const argon2 = require("argon2");

exports.getUsers = async(req, res) => {
    try {
        const response = await User.findAll({
            attributes: ['uuid', 'username', 'email', 'role']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

exports.getUserById = async(req, res) => {
    try {
        const response = await User.findOne({
            attributes: ['uuid', 'username', 'email', 'role'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

exports.createUser = async(req, res) => {
    const {username, email, password, confPassword, role} = req.body;
    if (password !== confPassword) return res.status(400).json({msg: "Password and Confirm Password Invalid"});
    const hashPassword = await argon2.hash(password);
    try {
        await User.create({
            username: username,
            email: email,
            password: hashPassword,
            role: role
        });
        res.status(201).json({msg: "Register Berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

exports.updateUser = async(req, res) => {
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    const {username, email, password, confPassword, role} = req.body;
    let hashPassword;
    if(password === "" || password === null){
        hashPassword = user.password
    } else {
        hashPassword = await argon2.hash(password);
    } 
    if (password !== confPassword) return res.status(400).json({msg: "Password and Confirm Password Invalid"});
    try {
        await User.update({
            username: username,
            email: email,
            password: hashPassword,
            role: role
        }, {
            where: {
                id: user.id
            }
        });
        res.status(200).json({msg: "User berhasil update"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

exports.deleteUser = async(req, res) => {
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    try {
        await User.destroy({
            where: {
                id: user.id
            }
        });
        res.status(200).json({msg: "User terhapus"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}