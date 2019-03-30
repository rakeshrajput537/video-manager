const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
// Load idea models 
require('../models/Idea');
const Idea = mongoose.model('ideas');
// process form
router.post('/', (req, res)=>{
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
				req.flash('success_msg','Video idea successfully added');
				res.redirect('/ideas');
			});
	}
});


// Add idea
router.get('/add', (req, res)=>{
	res.render('ideas/add');
});
// Edit Idea
router.get('/edit/:id',(req,res)=>{
	Idea.findOne({
		_id:req.params.id
	})
	 .then(idea=>{
		res.render('ideas/edit',{
			idea:idea
		});
	 });
	
});
// Update form
router.put('/:id',(req,res)=>{
	Idea.findOne({
		_id: req.params.id
	})
	 .then(idea=>{
		 idea.title=req.body.title;
		 idea.details = req.body.details;
		 idea.save()
		   .then(idea=>{
			   req.flash('success_msg','Video idea updated!!!')
			   res.redirect('/ideas');
		   });
	 });  
});
// Delete Idea
router.delete('/:id',(req,res)=>{
	Idea.remove({_id:req.params.id})
	 .then(()=>{
		 req.flash('success_msg', 'Video idea successfull removed!!!')
		 res.redirect('/ideas');
	 });

});


router.get('/', (req,res)=>{
	Idea.find({})
		.sort({date:'desc'})
		.then(ideas =>{
			res.render('ideas/index',{
				ideas:ideas
			});
		});
	
});



module.exports = router;