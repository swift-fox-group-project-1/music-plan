const axios = require(`axios`);
const { url } = require("inspector");
require("dotenv").config({ path: "../.env" });
const ticket = process.env.TICKET;

class MusikController {
    static getEvent(req, res) {
        axios({
            method: `get`,
            url: `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=ES&apikey=${ticket}`,
        })
            .then((result) => {
                // console.log(result.data);
                return res.status(200).json({
                    data: result.data._embedded.events,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    static searchEvent(req, res) {
        const keyword = req.params.keyword;
        // console.log(req.params);
        console.log(keyword + `ini server`);

        axios({
            method: `get`,
            url: `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${keyword}&apikey=${ticket}`,
        })
            .then((result) => {
                return res.status(200).json({
                    data: result.data._embedded.events,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    static findOne (req, res, next) {
        console.log("sampai di findOne ticket");
        const { id } = req.params
        // const id = 'vvG1YZ4VLloAHj'
        // axios.get('https://app.ticketmaster.com/discovery/v2/events/'+ id + '.json?apikey=' + process.env.TICKET)
        .then(({data}) => {
            console.log(data)
            return res.status(200).json(data)
        })
    }
}

module.exports = MusikController;
