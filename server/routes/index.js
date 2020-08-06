const router = require('express').Router()
const UserController = require('../controllers/UserControllers')
const authentication = require('../midlewares/authentication')
const Musik = require('./musikRoutes')

router.post('/register', UserController.register)
router.post('/login', UserController.logIn)
router.post('/googleLogin', UserController.googleLogin)
router.use(authentication)
router.use('/get-events', Musik)

module.exports = router
