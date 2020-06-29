const express = require('express');
const router = require('./routes/posts');
const mongoose = require('mongoose');

const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect("mongodb+srv://vmc:IDqVmsSYIPdIO7xW@cluster0-9mc6z.mongodb.net/mean-project?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, } )
    .then(() => {
        console.log("Connect to database");
    })
    .catch(() => {
        console.log("Connection Error");
    });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use("/api", router);



module.exports = app;