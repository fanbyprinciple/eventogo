const eRouter = require('express').Router;
eRoute = eRouter();

eRoute.get('/' , (req,res)=>{
	res.send("Get array of events here");
});

eRoute.get('/new', (req,res)=>{
	res.send('Add an event here');
});

eRoute.get('/:id', (req,res)=>{
	res.send('Get detail of your event here');
});

module.exports = eRoute;