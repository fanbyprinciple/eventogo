const uRouter = require("express").Router;
uRoute = uRouter();

// uRoute.get('/' , (req,res)=>{
// 	res.send("Details of user here");
// });

uRoute.get('/:id' , (req,res)=>{
	res.send("Details of user of given id here");
});

module.exports = uRoute;