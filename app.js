const express = require('express')
const app = express()
const loginRouter = require('./Router/login')
const coctailsRouter =require('./Router/cocktails')
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/user',loginRouter);

app.use(coctailsRouter);

app.listen(port, (req,res)=>{
    console.log(`Port dinleniyor ${port}`);
})