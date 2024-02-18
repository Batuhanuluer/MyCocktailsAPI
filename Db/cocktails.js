const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost:27017/cocktails', { useNewUrlParser: true, useUnifiedTopology: true });

const cocktailShema = new mongoose.Schema({
    name: String,
    description : String,
    ingredient : [String],
    userId : String,
})

const Cocktails = mongoose.model('Coctails', cocktailShema);

module.exports = Cocktails;