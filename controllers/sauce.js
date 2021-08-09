status  = require('http-status');
const Sauce = require('../models/Sauce');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    //delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(status.CREATED).json({ message: 'objet enregistré !'}))
        .catch(error => res.status(status.BAD_REQUEST).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(status.OK).json(sauce))
      .catch(error => res.status(status.NOT_FOUND).json({ error }))
  };

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
      .then(Sauces => res.status(status.OK).json(Sauces))
      .catch(error => res.status(status.BAD_REQUEST).json({ error }))
  };