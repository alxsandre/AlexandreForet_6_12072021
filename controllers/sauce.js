status  = require('http-status');
const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.createSauce = async (req, res, next) => {
  try { 
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        ...sauceObject,
        likes: 0,
        dislikes: 0,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    await sauce.save();
    return res.status(status.CREATED).json({ message: 'objet enregistré !'})
  } catch (error) {
    return res.status(status.BAD_REQUEST).json({ error })
  }
};
/*
exports.modifyLike = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
      let likes = sauce.likes;
      let dislikes = sauce.dislikes;
      let userId = req.body.userId;
      let usersLiked = sauce.usersLiked;
      let usersDisliked = sauce.usersDisliked;
      let userAlreadyLiked = usersLiked.includes(userId);
      let userAlreadyDisliked = usersDisliked.includes(userId);
        if (req.body.like === 1 && !userAlreadyLiked) {
          likes = likes + 1;
          usersLiked = [...usersLiked, userId];
        } else if (!req.body.like) {
          if (userAlreadyLiked) {
            likes = likes - 1;
            usersLiked = usersLiked.filter(usersId => usersId !== userId);
          }
          if (userAlreadyDisliked) {
            dislikes = dislikes - 1;
            usersDisliked = usersDisliked.filter(usersId => usersId !== userId);
          }
        } else if (req.body.like === -1 && !userAlreadyDisliked) {
            dislikes = dislikes + 1;
            usersDisliked = [...usersDisliked, userId];
        };
        Sauce.updateOne({ _id: req.params.id }, { likes, dislikes,  usersLiked, usersDisliked, _id: req.params.id})
          .then(() => res.status(status.OK).json({ message: 'Objet modifié!'}))
          .catch(error => res.status(status.NOT_FOUND).json({ error }));
    })   
};
*/

exports.modifyLike = async (req, res, next) => {
  try {
    const sauce = await Sauce.findOne({ _id: req.params.id });
    let likes = sauce.likes;
    let dislikes = sauce.dislikes;
    let userId = req.body.userId;
    let usersLiked = sauce.usersLiked;
    let usersDisliked = sauce.usersDisliked;
    let userAlreadyLiked = usersLiked.includes(userId);
    let userAlreadyDisliked = usersDisliked.includes(userId);
    if (req.body.like === 1 && !userAlreadyLiked) {
      likes = likes + 1;
      usersLiked = [...usersLiked, userId];
    } else if (!req.body.like) {
      if (userAlreadyLiked) {
        likes = likes - 1;
        usersLiked = usersLiked.filter(usersId => usersId !== userId);
      }
      if (userAlreadyDisliked) {
        dislikes = dislikes - 1;
        usersDisliked = usersDisliked.filter(usersId => usersId !== userId);
      }
    } else if (req.body.like === -1 && !userAlreadyDisliked) {
        dislikes = dislikes + 1;
        usersDisliked = [...usersDisliked, userId];
    };
    await Sauce.updateOne({ _id: req.params.id }, { likes, dislikes,  usersLiked, usersDisliked, _id: req.params.id})
    return res.status(status.OK).json({ message: 'Objet modifié!'});
  } catch (error) {
    return res.status(status.NOT_FOUND).json({ error });
  };
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
/*
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(status.OK).json(sauce))
      .catch(error => res.status(status.NOT_FOUND).json({ error }))
  };
*/
  /*
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
      .then(Sauces => res.status(status.OK).json(Sauces))
      .catch(error => res.status(status.BAD_REQUEST).json({ error }))
  };
  */

exports.getOneSauce = async (req, res, next) => {
  try {
    const sauce = await Sauce.findOne({ _id: req.params.id })
    return res.status(status.OK).json(sauce);
  } catch (error) {
    return res.status(status.NOT_FOUND).json({ error })
  }
};

exports.getAllSauces = async (req, res, next) => {
  try { 
    const sauces = await Sauce.find();
    return res.status(status.OK).json(sauces);
  } catch (error) {
    return res.status(status.BAD_REQUEST).json({ error });
  }
};
