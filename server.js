const express = require('express');

const bcrypt= require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const {handleRegister} = require ('./controllers/register.js');
const {handleSignin} = require ('./controllers/signin.js');
const {handleProfile} = require('./controllers/profile.js');
const {handleImage, handleApiCall} = require('./controllers/image.js');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : '#10@Elikawala',
      database : 'smart-brain'
    }
});




const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());



app.get('/', (req,res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    handleSignin(req,res,db,bcrypt);
})

app.post('/register', (req, res) => {
    handleRegister(req,res, db, bcrypt);
});

app.get('/profile/:id', (req,res) => {
    handleProfile(req,res,db);
})

app.put('/image', (req,res) => {
    handleImage(req,res, db)
})




app.listen(3000, ()=> {
    console.log('app is running');
})

