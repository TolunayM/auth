module.exports.registerValidation = (username, password) => {
    const errors = [];

    if (username === "") {
        errors.push({message: 'Please type a username'});
    }
    if (password === "") {
        errors.push({message: 'Please type a password'});
    }

    if(password.length < 7){
        errors.push({message: "Password length must be greater than 6"});
    }
    return errors;
}