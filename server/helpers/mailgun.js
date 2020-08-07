require("dotenv").config();

const api_key = process.env.MAILGUN;
const domain = process.env.DOMAIN_MAILGUN;
const mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

function mailSent(data) {
    console.log('>>', data.url, 'ini di mailgun');
    let tes = {
        from: 'otorigami@gmail.com',
        to: data.email,
        subject: `You successfully booking your ticket`,
        html: `
        Here's below your description ticket : '${data.url}'
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data.url}/150/150">
    `
    };

    return mailgun.messages().send(tes, function (error, body) {
        console.log(error, 'ini error');
        console.log(body, 'succes dong!');
    });
}

module.exports = mailSent