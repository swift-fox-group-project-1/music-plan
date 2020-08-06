// const { Todo } = require('../models')

// function authorization (req, res, next) {
//     const id = req.params.id
//     Todo.findByPk(id)
//         .then(data => {
//             if (data.UserId === req.UserId) {
//                 return next()
//             } else {
//                 throw {
//                     name: 'Unauhtorized',
//                     message: 'User Unauthorized',
//                     status: 401
//                 }
//             }
//         })
//         .catch(err => {
//             next (err)
//         })
// }

// module.exports = authorization