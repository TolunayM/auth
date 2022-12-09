const express = require('express');
const PORT = process.env.PORT || 3200;
const app = express();
const userRouter = require('./routes/users');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
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
    res.render("pages/index");
});

// olmayan bir sayfa icin 404 hatasi
app.use((req, res, next) => {
    res.render("static/404");
});

app.listen(PORT, () => console.log(`${PORT} up`));



