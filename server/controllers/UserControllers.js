const {User} = require('../models')
const {decoder} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')
const jwt = require('jsonwebtoken');

class UserController {
    static register(req, res, next) {
        const user = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        User.create(user)
            .then(data=>{
              const access_token = generateToken({
                  id: data.id,
                  username: data.username,
                  email: data.email
              })
              res.status(201).json({message: 'successfully registered', data, access_token})
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
                  console.log(data);
                    const verified = decoder(req.body.password, data.password)
                    if (verified) {
                        const access_token = generateToken({
                            id: data.id,
                            username: data.username,
                            email: data.email
                        })
                        res.status(200).json({access_token, id: data.id, email: data.email, username: data.username})
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

    static async googleLogin(req, res, next)
    {
      const {OAuth2Client} = require('google-auth-library');
      const client = new OAuth2Client(process.env.CLIENT_ID);
      async function verify() {
        const ticket = await client.verifyIdToken({
          idToken: req.body.access_token,
          audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
          // Or, if multiple clients access the backend:
          //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        // If request specified a G Suite domain:
        // const domain = payload['hd'];
        try
        {
          const data = await User.findOne({where: {email: payload.email}});
          if (!data)
          {
            const data = await User.create({username: payload.name, email:payload.email, password:"wakwaww"})
          }

          const access_token = jwt.sign({id: data.id, username: data.username, email: data.email}, process.env.JWT_SECRET_KEY);
          return res.status(200).json({access_token, username: data.username, email: data.email})
        }
        catch (err)
        {
          console.log(err);
        }
      }

      verify().catch(console.error);

    }
}

module.exports = UserController
