const db = require('./models').db;
const models = require('./models').models;

function signUp( name, email, username, password ){
    return models.UserLocal.create({
        username: username,
        password: password,
        user: {
            name: name,
            email: email
        }
        
    } , {
        include: [models.User] 
    })
}

function addUser( name , email ){
    return models.User.create({
        name, email  
        // Why does this work, shouldn't we use 'name:name' convention
    })
}

module.exports = {
    addUser,
    signUp
}