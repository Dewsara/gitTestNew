//Importing Express
const express = require('express');
//Importing Mongoose
const mongo =  require('mongoose');
//Importing bodyParser
const bParser = require('body-parser');
//Importing Cors
const cors = require('cors');
//Just adding some comments to here
//Adding more stuff

const app = express();

require('dotenv').config();

app.use(bParser.urlencoded({extended: true}));
app.use(bParser.json());
app.use(cors());

app.use("/SensorAPI", require("./Route/FireSensorRoute"));

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(422).send({ error: err.message });
});

const url = 'mongodb+srv://DSAssignment:DSAssignment@cluster0-vz7sv.mongodb.net/test?retryWrites=true&w=majority' ;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};

//Creating the connection with MongoDB.
mongo.connect(
    url, options
).then(() => {
    app.listen(5000);
}).catch((err) => {
    console.log(err);
});


