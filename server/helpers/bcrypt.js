const bcrypt = require('bcrypt')

const salt = bcrypt.genSaltSync(10)

function encoder(password) {
    return bcrypt.hashSync(password, salt)
}

function decoder(password, encodedPassword) {
    return bcrypt.compareSync(password, encodedPassword)
}

module.exports = {encoder, decoder}
