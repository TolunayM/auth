const validation = require('../validation/formValidation');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/UserModel');
module.exports.getUserLogin = (req, res,next) => {
    res.render("pages/login");
}
module.exports.postUserLogin = (req, res,next) => {
    res.send("Login");
}

module.exports.getUserRegister = (req, res,next) => {
    res.render("pages/register");
}
module.exports.postUserRegister = (req, res,next) => {
    const username = req.body.username;
    const password = req.body.password;

    const userValidation = validation.registerValidation(username, password);

    if(userValidation.length > 0 ){
        
        for(let i = 0; i < userValidation.length;i++){
            console.log(userValidation[i].message);
        }
        res.render("pages/register", {
            username: username,
            password: password,
            errors : userValidation
        });
    }else{
        const newUser = new UserModel({
            username: username,
            password: password
        });
        newUser
        .save()
        .then(() => {
            console.log('User saved');
            res.redirect('/');
        
        })
        .catch(err => console.log(err));
    }
    
}