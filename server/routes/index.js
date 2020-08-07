const router = require('express').Router()
const UserController = require('../controllers/UserControllers')
const mailgunController = require('../controllers/mailgunController')
const authentication = require('../midlewares/authentication')
const Musik = require('./musikRoutes')

router.post('/register', UserController.register)
router.post('/login', UserController.logIn)
router.post('/googleLogin', UserController.googleLogin)
router.use(authentication)
router.use('/get-events', Musik)
router.get('/sent', mailgunController.sent)

module.exports = router
