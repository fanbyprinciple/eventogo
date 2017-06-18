// There are three main parts in using passport.js:
// http://toon.io/understanding-passportjs-authentication-flow/
// Requiring the module and using its passport.initialize() and passport.session() middleware with express.
// Configuring passport with at least one Strategy and setting up passport's serializeUser and deserializeUser methods.
// Specifying a route which uses the passport.authenticate middleware to actually authenticate a user.


const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const models = require('../db/models').models;

passport.serializeUser((user, done)=>{
    done(null,user.email);
});

passport.deserializeUser((email, done)=>{
    models.User.findOne({
        where: {
            email: email
        }
    }).then((user)=>{
        done(null,user);
    })
});

passport.use(new LocalStrategy( function (username, password , cb){
    models.UserLocal.findOne({
        where: {
            username: username
        },
        include: [models.User]
    }).then((userLocal)=>{
        if(!userLocal){
            return cb(null, false , {message: "Wrong Username"});
        }
        if(userLocal.password == password){
            return cb(null, userLocal.user);
        } else {
            return cb(null , false , {message: "Wrong Password"});
        }

    }).catch ((err)=>{
        return cb(err,false);
    });

}));

module.exports =passport;