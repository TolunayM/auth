module.exports.getUserLogin = (req, res,next) => {
    res.render("pages/login");
}
module.exports.postUserLogin = (req, res,next) => {
    res.send("hacked");
}

module.exports.getUserRegister = (req, res,next) => {
    res.render("pages/register");
}
module.exports.postUserRegister = (req, res,next) => {
    res.send("not hacked");
}