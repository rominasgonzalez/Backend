let express = require("express");
var exphbs  = require('express-handlebars');
let cors = require("cors")
let axios = require("axios");
let {config} = require("./config");
let serverRoutes = require("./routes");
let fs = require("fs");
let path = require("path");
let multer = require("./utils/middlewares/multer");


//Initializations
let app = express();


//settings
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.set('views', path.join(__dirname,'views', 'ejs'));
app.set('view engine', 'ejs');


//Middlewares
app.use(cors(``))