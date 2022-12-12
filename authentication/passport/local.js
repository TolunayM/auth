const localStrategy = require('passport-local');
const passportJS = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../../models/UserModel');

passportJS.use(new localStrategy((username,password,done) => {
    User.findOne({username},(err,user) => {
        if (err) return done(err,null,"Something Wrong");
        if(!user){
            return done(null,false,"User not found");
        }
        bcrypt.compare(password,user.password,(err,res) => {
            if(res){
                return done(null,user,"Succesfully Logged In");
            }else{
                return done(null,false,"Incorrect Password");
            }
        });
    });
}));

passportJS.serializeUser(function(user,done){
    done(null,user.id);
});

passportJS.deserializeUser(function(id,done){
    User.findById(id, (err,user) => {
        done(err,user);
    });
});