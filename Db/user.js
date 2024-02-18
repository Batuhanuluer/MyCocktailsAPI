const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/userDB', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  email: String,
  name:String,
  password: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
