const express = require('express');
const app = express();
status  = require('http-status');

require('dotenv').config();

//const Sauce = require('./models/Sauce');
const User = require('./models/User');

const mongoose = require('mongoose');
mongoose.connect(process.env.ACCES_MONGOOSE,
{ useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.post('/api/auth/signup', (req, res) => {
    console.log(req.body)
    //Datas to test example : { "userId" : "LeRoidessauces", "email" : "alexandre.450@gmail.com", "password" : "1234" }
    const user = new User({
        ...req.body
    })
    user.save()
        .then(() => res.status(status.CREATED).json({ message: 'utilisateur créé'}))
        .catch((error => res.status(status.BAD_REQUEST).json({ error })))
})
module.exports = app;