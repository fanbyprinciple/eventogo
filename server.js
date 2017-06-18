const express = require('express');
const cookieParser = require('cookie-parser');
// stores session ID only
const bodyParser = require('body-parser');
const expressSession = require('express-session');//for storing session related info
// is it critical ?
const passport = require('./auth/passport');

const app = express();

app.set("view engine" , 'hbs');

app.get('/',(req,res)=>{
	res.send ("@localhost:2300");
});

app.use(cookieParser('ashwinseemssad'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(expressSession({
	secret: "ashwinseemssad",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
//If your application uses persistent login sessions, passport.session() middleware must also be used.

app.use('/api', require('./routes/api')); 
app.use('/' ,require('./routes/pages')); 
// why doesn't it work with just routes

app.listen(2300,()=>{
	console.log("Listening to port 2300");
});