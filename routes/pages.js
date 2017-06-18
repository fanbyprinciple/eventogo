const router = require("express").Router;
route = router();

route.get('/' , (req,res)=>{
	res.send("@ /routes/pages");
});

module.exports = route;