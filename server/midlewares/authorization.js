const { Concert } = require('../models')

function authorization (req, res, next) {
    const id = req.params.name
    console.log(id);
    Concert.findOne({where: {name: id}})
        .then(data => {
          console.log(data);
            if (data.UserId === req.userLogin.id) {
                return next()
            } else {
                throw {
                    name: 'Unauhtorized',
                    message: 'User Unauthorized',
                    status: 401
                }
            }
        })
        .catch(err => {
            next (err)
        })
}

module.exports = authorization
