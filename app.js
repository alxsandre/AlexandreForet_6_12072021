const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.post('/api/auth/signup', (req, res) => {
    console.log(req.headers)
    console.log(req.body.email)
    res.status(201).send('hello post')
})
module.exports = app;