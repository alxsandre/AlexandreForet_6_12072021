status  = require('http-status');
const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    //delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        likes: 0,
        dislikes: 0,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(status.CREATED).json({ message: 'objet enregistré !'}))
        .catch(error => res.status(status.BAD_REQUEST).json({ error }));
};

exports.modifyLike = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
      let likes = sauce.likes;
      let usersLiked = sauce.usersLiked;
      let userId = req.body.userId;
    console.log([userId]);

        if (req.body.like && req.body.like === 1) {
          likes = likes + req.body.like;
          usersLiked = [...usersLiked, userId]
        } else if (req.body.like && req.body.like === 0 || req.body.like === -1) {
          likes = likes - 1;
          if (usersLiked.includes(userId)) { usersLiked.filter(usersId => usersId !== userId) }
        };

        Sauce.updateOne({ _id: req.body.id }, { likes, usersLiked, _id: req.params.id})
          .then((sauce) => { console.log(sauce)
            res.status(status.OK).json({ message: 'Objet modifié!'})
        })
          .catch(error => res.status(status.NOT_FOUND).json({ error }));
    })   
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
     {
       ...JSON.parse(req.body.sauce),
       imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body }
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id})
      .then(() => res.status(status.OK).json({ message: 'Objet modifié!'}))
      .catch(error => res.status(status.NOT_FOUND).json({ error }));
  };

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(status.OK).json({ message: 'Objet supprimé !' }))
            .catch(error => res.status(status.NOT_FOUND).json({ error }))
        });
        })
        .catch(error => res.status(status.INTERNAL_SERVER_ERROR).json({ error }))
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