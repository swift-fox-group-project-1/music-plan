const mailSent = require('../helpers/mailgun')

class MailgunController {
    static sent (req, res, next) {
        console.log(req.query, 'udah nyampe nih di controller');
        mailSent({email: req.query.data, url: req.query.id})
    }
}

module.exports = MailgunController