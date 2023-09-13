require('dotenv').config();

var express = require('express');
var cors = require('cors')

var app = express();

app.use(cors())
app.use(express.json());

app.use(express.urlencoded({extended:false}));

var auth = require('./module/v1/auth/route');

app.use('/',require('./middleware/middleware.js').extractHeaderLanguage);

app.use('/',require('./middleware/middleware.js').validateApiKey);

app.use('/',require('./middleware/middleware.js').validateHeaderToken);

app.use('/v1/auth',auth);

app.engine('html',require('ejs').renderFile);
app.set('view engine','html');

try {
    app.listen(process.env.PORT);
    console.log("Database connected successfully at :",process.env.PORT);
} catch (error) {
    console.log("Database connection failed!!",error);
};