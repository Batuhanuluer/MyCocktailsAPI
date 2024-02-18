const express = require('express');
const app = express.Router();
const cocktailsController = require('../Controller/cocktails')

app.get('/cocktails',cocktailsController.GetAllCocktails)

app.post('/cocktail',cocktailsController.AddNewCoctail)

app.delete('/cocktail/:id',cocktailsController.DeleteCocktail)

app.patch('/coctail/:id',cocktailsController.UpdateCocktail)

module.exports = app