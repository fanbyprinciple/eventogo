const userRouter = require("express").Router;
userRoute = userRouter();

// userRoute.get('/' , (req,res)=>{
// 	res.send("Details of user here");
// });

userRoute.get('/:id' , (req,res)=>{
	res.send("Details of user of given id here");
});

module.exports = userRoute;