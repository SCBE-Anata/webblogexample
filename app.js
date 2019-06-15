const express = require ('express'),
	bodyParser= require('body-parser'),
	mongoose= require('mongoose'),
	app=express(),
	  methodOverride=require('method-override'),
	  expressSanitizer=require('express-sanitizer');

mongoose.connect("mongodb://localhost:27017/CharleneApp", {useNewUrlParser: true});
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
// Needs to be after body parser
app.use(expressSanitizer());

var blogSchema= new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);



// RESTFUL ROUTES

app.get("/",(req,res)=>{
	res.redirect("/blogs");
});

app.get("/blogs", (req,res)=> {
	Blog.find({},(error,blogs)=>{
		if (error){
		console.log("Error");
	}else {
		res.render("index", {blogs: blogs});
	}
	});
});

// New route
app.get("/blogs/new", (req,res)=> {
	res.render("new");
});

// Create route
app.post('/blogs', (req,res)=> {
	req.body.blog.body=req.sanitizer(req.body.blog.body);
	Blog.create(req.body.blog, (error, smallBlog)=>{
	if (error){
		render.render("new");
	}else {
		res.redirect("/blogs");
	}
				});
});

//Show
app.get('/blogs/:id', (req,res)=>{
	Blog.findById(req.params.id, (error, foundBlog)=> {
		if(error){
			res.redirect("/blogs");
		} else {
			res.render('show.ejs', {blog: foundBlog});
		}
		});
});

//Edit
app.get("/blogs/:id/edit", (req,res)=> {
	Blog.findById(req.params.id, (error, foundBlog)=> {
		if(error){
			res.redirect("/blogs");
		} else {
			res.render("edit", {blog:foundBlog});
		}
	});
	
});

//Update
app.put("/blogs/:id", (req,res)=> {
	req.body.blog.body=req.sanitizer(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id,req.body.blog, (error, updatedBlog)=> {
		if(error){
			res.redirect("/blogs");
		}else {
			res.redirect("/blogs/"+req.params.id);
		}
		
	});
});

//Delete
app.delete("/blogs/:id", (req,res)=> {
	Blog.findByIdAndRemove(req.params.id, (error)=> {
		if(error){
			res.redirect("/blogs");
		}else {
			res.redirect("/blogs");
		}
	});
});

app.listen(9000, ()=> {
	console.log("Server is on");
});