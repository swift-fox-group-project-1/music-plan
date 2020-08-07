const { User, Concert } = require('../models');

class WishlistController {
  static view(req, res, next)
  {
    Concert.findAll({where: {UserId: +req.userLogin.id}})
      .then(data => {
        return res.status(200).json(data);
      })
      .catch(err => next(err));
  }

  static post(req, res, next)
  {
    const concertData = {
      name: req.body.name,
      venue: req.body.venue,
      start: req.body.start,
      country: req.body.country,
      price: req.body.price,
      UserId: req.userLogin.id
    }

    Concert.create(concertData)
    .then(data => {
        return res.status(201).json(data);
      })
    .catch(err => next(err));
  }

  static destroy(req, res, next)
  {

    Concert.findOne({where: {name: req.params.name}})
      .then(data => {
          data.destroy();
          res.status(200).json({message: "deleted"});
      })
      .catch(err => next(err));
  }
}

module.exports = WishlistController;
