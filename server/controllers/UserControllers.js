const {User} = require('../models')
const {decoder} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')

class UserController {
    static register(req, res, next) {
        const user = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }

        User.create(user)
            .then(data=>{
                res.status(201).json({message: 'successfully registered', data})
            })
            .catch(err=>{
                next(err)
            })
    }

    static logIn(req, res, next) {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(data=>{
                if (data) {
                    const verified = decoder(req.body.password, data.password)
                    if (verified) {
                        const access_token = generateToken({
                            username: data.username,
                            email: data.email
                        })

                        res.status(200).json({access_token})
                    } else {
                        console.log('di sini password')
                        throw {
                            message: 'incorrect email or password',
                            status: 404,
                            name: 'NOT_FOUND'
                        }
                    }
                } else {
                    console.log('di sini')
                    throw {
                        message: 'user doesnt exist',
                        status: 404,
                        name: 'NOT_FOUND'
                    }
                }
            })
            .catch(err=>{
                next(err)
            })
    }
}

module.exports = UserController
