const router = require("express").Router;
route = router();
const dbAction = require('../db/actions');
const passport = require('../auth/passport');
const el = require('../auth/authutils').ensureLogin;

route.get('/login', (req, res)=>{
	return res.render('login', {});
});

route.post('/login', passport.authenticate('local',{
	failureRedirect: '/login',
	successRedirect: '/profile'
}));

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