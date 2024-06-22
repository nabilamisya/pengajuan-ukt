const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const url = require('url');
const cors = require("cors");
require('dotenv').config();
const UserRoute = require("./routes/UserRoute.js");
const AuthRoute = require("./routes/AuthRoute.js");
const MhsRoute = require("./routes/MahasiswaRoute.js");

const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })


const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', MhsRoute);
app.use('/users', UserRoute);
app.use('/auth', AuthRoute);
app.use(express.static(path.join(__dirname, 'public')))
//user




// Server Yang Berjalan
app.listen(process.env.PORT);