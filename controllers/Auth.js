const User = require("../models/UserModel.js");
const argon2 = require("argon2");

exports.login = async(req, res) => {
    const user = await User.findOne({
        where: {
            username: req.body.username
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    const match = await argon2.verify(user.password, req.body.password);
    if (!match) return  res.status(400).json({msg: "Wrong Password"});
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const username = user.username;
    const email = user.email;
    const role = user.role;
    res.status(200).json({uuid, username, email, role});
}

exports.me = async(req, res) => {
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke akun anda!"});
    }
    const user = await User.findOne({
        attributes:['uuid','username', 'email', 'role'],
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    res.status(200).json(user);
}

exports.logout = (req, res) => {
    req.session.destroy((err)=> {
        if(err) return res.status(400).json({msg: "Tidak dapat logout"});
        res.status(200).json({msg: "Anda telah logout"});
    });
}