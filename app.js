const express = require('express');
const app = express();

//const Sauce = require('./models/Sauce');
const User = require('./models/User');

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://alexandre:Sandre12@cluster0.jr8rj.mongodb.net/dataSoPekocko?retryWrites=true&w=majority',
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
        .then(() => res.status(201).json({ message: 'utilisateur créé'}))
        .catch((error => res.status(400).json({ error })))
        /*
    console.log(req.headers)
    console.log(req.body.email)
    res.status(201).send('hello post')
    */
})
module.exports = app;