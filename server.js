const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const postgresdB = require('knex')({
        client: 'pg',
        connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'postgres2022',
      database : 'faceRecognitionBrain'
    }
  });

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send("Loaded successfully!");
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, postgresdB, bcrypt)})
app.post('/register', (req, res) => { register.handleRegister(req, res, postgresdB, bcrypt)})
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, postgresdB)})
app.put('/image', (req, res) => { image.handleImage(req, res, postgresdB)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req,res)})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
})

console.log(PORT)

