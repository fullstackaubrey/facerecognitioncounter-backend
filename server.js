const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

const postgresdB = require('knex')({
        client: 'pg',
        connection: {
          host : process.env.DATABASE_URL,
      connectionString: process.env.DATABASE_URL,
      ssl: true
    }
  });

const app = express(cors());

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

app.listen(process.env.PORT || 3000, ()=> {
  console.log(`Server is running on ${process.env.PORT}`);
})
