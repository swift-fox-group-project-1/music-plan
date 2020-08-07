const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

function authentication (req, res, next) {
    try {
        if (req.headers.access_token) {
            let verify = verifyToken(req.headers.access_token)
            console.log(verify);
            console.log('access token', req.headers.access_token)
            User.findByPk(verify.id)
                .then(user => {
                    req.userLogin = user;
                    console.log(req.userLogin, 'this is in authentication');
                    next()
                })
                .catch (next)
        } else {
            throw {
                name: 'Unauthenticated',
                message: 'Please login first',
                status: 401
            }
        }
    } catch (err) {
        next (err)
    }
}

module.exports = authentication
