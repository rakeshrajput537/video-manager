const express = require('express');

const mongoose = require('mongoose');
var exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');  

const app = express();
//body parse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mongoose.Promise = global.Promise;
// connect to mongoose
mongoose.connect("mongodb://localhost:27017/YourDB", { 
	useNewUrlParser: true 
})
 .then(()=>console.log("mongoDB connected"))
 .catch(err=>console.log(err));


// Load idea models 
 require('./models/Idea');
 const Idea = mongoose.model('ideas');
// Handlebars middleware
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
})); 
app.set('view engine', 'handlebars');

// process form
app.post('/ideas', (req, res)=>{
	let errors=[];
	if(!req.body.title){
		errors.push({text:'please add a text'});
	}
	if(!req.body.details){
		errors.push({text:'please add some details'});
	}
	if (errors.length>0) {
		res.render('ideas/add',{
			errors: errors,
			title: req.body.title,
			details: req.body.details
		});
	}
	else{
		const newUser = {
			title: req.body.title,
			details: req.body.details
		}
		new Idea(newUser)
			.save()
			.then(Idea=>{
				res.redirect('/ideas');
			});
	}
});

// middle ware use 
app.use(function (req,res,next) {
	req.name="rakesh";
	next();
});
app.get('/ideas/add', (req, res)=>{
	res.render('ideas/add');
});
app.get('/',(req,res)=>{
	res.render('index');
});
app.get('/about', (req,res)=>{
	res.render('about');
});
app.get('/ideas', (req,res)=>{
	Idea.find({})
		.sort({date:'desc'})
		.then(ideas =>{
			res.render('ideas/index',{
				ideas:ideas
			});
		});
	
})
app.listen(3000, ()=>{
	console.log("server is running in port no 3000");
});