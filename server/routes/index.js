const router = require('express').Router()
const UserController = require('../controllers/UserControllers')
const mailgunController = require('../controllers/mailgunController')
const authentication = require('../midlewares/authentication');
const authorization = require('../midlewares/authorization');
const WishlistController = require('../controllers/WishlistController.js');
const Musik = require('./musikRoutes')

router.post('/register', UserController.register)
router.post('/login', UserController.logIn)
router.post('/googleLogin', UserController.googleLogin)
router.use(authentication)
router.use('/get-events', Musik)
router.get('/sent', mailgunController.sent)
router.get('/wishlist', WishlistController.view);
router.post('/wishlist', WishlistController.post);
router.delete('/wishlist/:name', authorization, WishlistController.destroy)

module.exports = router
