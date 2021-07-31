const express = require('express');
const app = express();

require('dotenv').config();

const userRoutes = require('./routes/user');

//const Sauce = require('./models/Sauce');

const mongoose = require('mongoose');
mongoose.connect(process.env.ACCES_MONGOOSE,
{ useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/api/auth', userRoutes);

module.exports = app;