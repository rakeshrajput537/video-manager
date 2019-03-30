const express = require('express');
const router = express.Router();

// User Login  Route
app.get('/users/login',(req,res)=>{
	res.send('Login');
});
// User Registration Route
app.get('/users/register',(req,res)=>{
	res.send('register');
});


module.exports= router;