const userRouter = require("express").Router;
const models = require('../../db/models').models;
const passport = require('../../auth/passport');
const authutils = require('../../auth/authutils');

userRoute = userRouter();

userRoute.get('/',
    passport.authenticate('bearer'),
    (req, res) => {
    console.log(req)
    models.User.findAll().then((users) => {
        res.send(users);
    })
});

userRoute.get('/:id',
    passport.authenticate('bearer'),
    (req, res) => {
    models.User.findOne({
        where: {
            id: req.params.id
        }
    }).then((user) => {
        res.send(user);
    })
});

userRoute.get('/:id/details',
    passport.authenticate('bearer'),
    authutils.ensureUserIsId({
        param: 'id'
    }),
    (req, res) => {
    models.User.findOne({
        where: {
            id: req.params.id
        } ,
        include: [models.UserLocal]
    }).then((user) => {
        res.send(user)
    })
});


module.exports = userRoute;