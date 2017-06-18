const Sequelize = require('sequelize');

const db = new Sequelize('eventogodb', 'eventogoadmin', 'eventogopass', {
	host: 'localhost',
	dialect: 'mysql'
});

//databse schema
const Event = db.define('event', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	name: Sequelize.STRING,
	startTime: Sequelize.DATE,
	endTime: Sequelize.DATE,
	hostMessage: Sequelize.STRING,
	venue: Sequelize.STRING
});

const User = db.define('user', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	name: Sequelize.STRING,
	email: Sequelize.STRING
});

const UserLocal = db.define('userlocal', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	username: Sequelize.STRING,
	password: Sequelize.STRING
});

// const AuthToken = db.define('authToken' , {
// 	token:{
// 		type: Sequelize.STRING,
// 		primaryKey: true
// 	}
// });

//relationships
Event.belongsTo(User);
User.hasMany(Event);

UserLocal.belongsTo(User);
User.hasOne(UserLocal);

// AuthToken.belongsTo('User');
// User.hasOne('AuthToken');

db.sync({force: false})
	.then(function (){
	console.log("Database successfully synchronised. ");
})
.catch((err)=>{
	console.log("Database synchronisation failed. ");
});

module.exports = {
	db , 
	models: {
		User,
		UserLocal,
		Event
		//AuthToken
	}
}