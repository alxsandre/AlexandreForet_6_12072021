status  = require('http-status');
const bcrypt = require('bcrypt');

const User = require('../models/User');

exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            })
            user.save()
                .then(() => res.status(status.CREATED).json({ message: 'utilisateur créé'}))
                .catch((error => res.status(status.BAD_REQUEST).json({ error })))
        });
};

exports.login = (req, res) => {
    const user = new User({
        ...req.body
    })
    user.save()
        .then(() => res.status(status.OK).json({ message: 'logué!'}))
        .catch((error => res.status(status.UNAUTHORIZED).json({ error })))
};