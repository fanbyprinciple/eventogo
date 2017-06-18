const express = require('express');

const app = express();

app.get('/',(req,res)=>{
	res.send ("@localhost:2300");
});

app.use('/api', require('./routes/api')); 
app.use('/pages' ,require('./routes/pages')); // why doesn't it work with just routes

app.listen(2300,()=>{
	console.log("Listening to port 2300");
});