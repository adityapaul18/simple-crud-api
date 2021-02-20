const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// this part is solely to connect the database

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{ useNewUrlParser: true ,useUnifiedTopology: true , useCreateIndex: true});

// checks is connnection requesst accepted or not

const connection = mongoose.connection;
connection.once('open' , () => {
    console.log("Database Connnected");
})

// this part is to export routes of the api
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);


// this part checks if the server is up andd runnning on the port specified

app.listen(port,() => {
    console.log(`Server running at port:${port}`)
})