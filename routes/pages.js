const router = require("express").Router;
route = router();
const dbAction = require('../db/actions');
const passport = require('../auth/passport');
const el = require('../auth/authutils').ensureLogin;
const models = require('../db/models').models;
const uid = require('uid2');

route.get('/login', (req, res)=>{
	return res.render('login', {});
});

route.post('/login', passport.authenticate('local',{
	failureRedirect: '/login',
	successRedirect: '/profile'
}));

route.post('/authorize', (req, res) => {
    models.UserLocal.findOne({
        where: {
            username: req.body.username,
            password: req.body.password
        }
    }).then((user) => {
		if(!user) {
			res.send("input values first !");
		} else {
			models.AuthToken.create({ 
				// problem this creates authtoken for the same user twice
				token: uid(30),
				userId: user.id
			}).then((authtoken) => {
				res.send(authtoken.token)
			})
		}
    })
});

route.get('/signup' , (req,res)=>{
	return res.render('signup', {});
})

route.post('/signup' , (req,res)=>{
	dbAction.signUp(
		req.body.username,
		req.body.email,
		req.body.name,
		req.body.password
	).then((userLocal)=>{
		res.redirect('/login');
	});
});

route.get('/profile', (req,res)=>{
	res.render("profile", {
		name: req.user.name,
		email: req.user.email
	});
});

route.get('/logout' , (req, res)=>{
	req.user=null;
	req.logout();
	req.session.destroy(()=>{
		res.redirect('/login');
	});
});

route.get('/' , (req,res)=>{
	res.send("@ /routes/pages");
});

module.exports = route;