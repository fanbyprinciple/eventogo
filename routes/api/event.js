const eventRouter = require('express').Router;
eventRoute = eventRouter();

eventRoute.get('/' , (req,res)=>{
	res.send("Get array of events here");
});

eventRoute.post('/new', (req,res)=>{
	res.send('Add an event here');
});

eventRoute.get('/:id', (req,res)=>{
	res.send('Get detail of your event here');
});

eventRoute.put('/:id', (req,res)=>{
	res.send("Modify events here");
});

module.exports = eventRoute;