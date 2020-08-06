const jwt = require('jsonwebtoken')
const key = process.env.JWT_SECRET_KEY

function generateToken(payload) {
    return jwt.sign(payload, key)
}

function verifyToken(token) {
    return jwt.verify(token, key)
}

module.exports = {generateToken, verifyToken}
