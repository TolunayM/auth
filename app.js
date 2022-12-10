const express = require('express');
const PORT = process.env.PORT || 3200;
const app = express();
const userRouter = require('./routes/users');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const userModel = require('./models/UserModel');
const passportJS = require('passport');



//Passport initialize 





// Flash Middleware
app.use(cookieParser("passportTut"));
app.use(
    session({
        cookie: { maxAge:60000},
        resave: true,
        secret: 'passportTut',
        saveUninitialized: true    
    }));
app.use(flash());
app.use(passportJS.initialize());
app.use(passportJS.session());

// Global-res.locals
app.use((req,res,next) => {
    //Own flashs
    res.locals.flashSuccess = req.flash("flashSuccess");
    res.locals.flashError = req.flash("flashError");
    //passportjs flashs

    res.locals.passportFailure = req.flash('error');
    res.locals.passportSuccess = req.flash("success");

    //our logged in user
    res.locals.user = req.user;

    next();
});


//MongoDB
mongoose.connect("mongodb://localhost/passportdb", {useNewUrlParser: true});
const db = mongoose.connection;
db.on("error",console.error.bind(console,"Connection Error"));
db.once("open", () =>{
    console.log("Database Connected");
});

//BodyParser Middleware
app.use(bodyParser.urlencoded({extended: false}));


//Template Engine Middleware  $$ Import ile kullanirken exphbs.engine olarak kullanmamiz gerek
app.engine('handlebars', exphbs.engine({defaultLayout: 'mainLayout'}));
app.set('view engine','handlebars');


// User Middleware
app.use(userRouter);


//Get 
app.get("/", (req, res,next) => {
    userModel.find()
    .lean()  // getting json object instead of mongoose one
    .then(users => {
        res.render("pages/index",{users});
    }).catch(err => console.log(err));
});

// 404
app.use((req, res, next) => {
    res.render("static/404");
});

app.listen(PORT, () => console.log(`${PORT} up`));