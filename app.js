const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const mongoose = require('mongoose')
const router = require('./routes/api')
const jwt = require('jsonwebtoken')

app.use('/', function (req, res, next) {
    if (!req.path.startsWith('/login') && !req.path.startsWith('/create')) {
        try {
            let j = jwt.verify(req.headers['authorization'], process.env.SECRET)
            console.log("kkkj");
            console.log(j);
            req.id = j.id
            console.log(req.id);
            next()
        } catch (error) {
            res.send('not login!!!')
        }
    }
    else {
        next()
    }
})

app.use('/', router)

const connectionParams = {
    newUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

mongoose.connect(process.env.DB_CONNECT, connectionParams)
    .then(() => {
        console.log("connected to db");
    })
    .catch((err) => {
        console.log("error: " + err);
    })

app.listen(5000, () => {
    console.log("listening 5000");
})