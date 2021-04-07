const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const pg =require('pg');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const apicall = require('./controllers/apicall');


const db = knex({
  client: 'pg',
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
  // connection: {
  //   host : '127.0.0.1',
  //   user : 'postgres',
  //   password : 'postgreSQL',
  //   database : 'smart_brain',
  // }
});

const app = express();
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
	res.send('Well finally its working');
})
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {apicall.handleApiCall(req, res)})
var port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`app is running on port ${port}`)
})


/*
API planning
/ (root) --> res.send =this is working
/signin --> POST = success/fail
/register --> POST = User
/profile/:uderId --> GET = user
/image --> PUT --> user


*/
