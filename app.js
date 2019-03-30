const express = require('express');
const mongoose = require('mongoose');
var exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');  
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');


const app = express();

const ideas = require('./routes/ideas');
//body parse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
// Express Session middleware 
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true,
 }));

 app.use(flash());
 // Gloabl variables
 app.use(function(req,res,next){
	 res.locals.success_msg = req.flash('success_msg');
	 res.locals.error_msg = req.flash('error_msg');
	 res.locals.error = req.flash('error');
	 next(); 
 });



mongoose.Promise = global.Promise;
// connect to mongoose
mongoose.connect("mongodb://localhost:27017/YourDB", { 
	useNewUrlParser: true 
})
 .then(()=>console.log("mongoDB connected"))
 .catch(err=>console.log(err));

 app.get('/',(req,res)=>{
 	res.render('index');
 });
 app.get('/about', (req,res)=>{
	res.render('about');
});

// Handlebars middleware
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
})); 
app.set('view engine', 'handlebars');
app.use('/ideas',ideas);
app.listen(3000, ()=>{
	console.log("server is running in port no 3000");
});