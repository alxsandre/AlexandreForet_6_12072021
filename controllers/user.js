status  = require('http-status');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(status.UNAUTHORIZED).json({ error: 'Utilisateur déjà créé!'})
            }
            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    const user = new User({
                        email: req.body.email,
                        password: hash
                    })
                    user.save()
                        .then(() => res.status(status.CREATED).json({ message: 'utilisateur créé'}))
                        .catch((error => res.status(status.BAD_REQUEST).json({ error })))
                })
                .catch(error => res.status(status.INTERNAL_SERVER_ERROR).json({ error }));
            })
        .catch(error => res.status(status.INTERNAL_SERVER_ERROR).json({ error }))
};

exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(status.UNAUTHORIZED).json({ error: 'Utilisateur non trouvé!'})
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(status.UNAUTHORIZED).json({ error: 'mot de passe incorrect!'});
                    }
                    res.status(status.OK).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.TOKEN,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(status.INTERNAL_SERVER_ERROR).json({ error }))
        })
        .catch(error => res.status(status.INTERNAL_SERVER_ERROR).json({ error }))
};