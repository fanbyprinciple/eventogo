const router = require("express").Router;
route = router();

route.get('/' , (req,res)=>{
 	res.send("@ /routes/api/index");
});

route.use('/event' , require('./event'));
route.use('/user' , require('./user'));


module.exports = route;