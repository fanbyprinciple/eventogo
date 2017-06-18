
function ensureLogin(fallbackPath){
    return function (req, res, next){
        if(!req.user) {
            res.redirect(fallbackPath);
        } else {
            next();
        }
    }    
}

// function ensureAdmin(fallbackPath){
//     return function (req, res, next){
//         if(req.user && req.user.role == 'admin' ){
//             next();
//         } else {
//             res.redirect(fallbackPath);
//         }
//     }
// }

// function ensureUserIsId(dataField){  // what is this for ?
//     let data;
//     if(dataField.param){
//         data = dataField.param;
//     }
//     if(dataField.query){
//         data = dataField.query;
//     }
//     if(req.user.id == data) {
//         next();
//     } else {
//         res.send('Authentication denied. ensureUserIsId(), authutils.js');
//     }
// }

module.exports = {
    ensureLogin
}