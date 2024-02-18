const express = require('express')
const app = express.Router()
const loginController = require('../Controller/login')

app.post('/login', loginController.Login);

app.post('/register',loginController.Register);

module.exports = app;   