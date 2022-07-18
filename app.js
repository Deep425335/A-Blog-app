
const express = require("express")
const mongoose = require("mongoose")
const Blog = require("./models/blog")
 
//express app
const app = express()
app.use(express.urlencoded({ extended: true }))//middleware
// connect to mongo db

const dbURI = "mongodb+srv://corizo:test1234@nodetuts.qikjjks.mongodb.net/?retryWrites=true&w=majority"


 
mongoose.connect(dbURI)
.then(()=>{
    app.listen(3000)
})
.catch((err)=>{
    console.log(err)
   
})
 
app.set("view engine", "ejs")


// get
app.get("/", (req, res)=>{
 
    
    res.redirect("/blogs")
   
})

app.get("/blogs",(req,res)=>{
    Blog.find().then((result)=>{
        res.render("index",{title: "all-blogs",
           blogs: result})
        
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.post("/blogs",(req,res)=>{
    
    const blog = new Blog(req.body)
    blog.save().then((result)=>{
        res.redirect("/blogs")
    })
    .catch((err)=>{
        console.log(err)
    })
})
 
app.get("/about",(req, res)=>{
   
    res.render("about",  {title: "About"})
})
// // redirect

 
app.get("/blogs/create",(req, res)=>{
    res.render("create",  {title: "Create a new Blog"})
})

app.get("/blogs/:id",(req,res)=>{
    const id = req.params.id
    Blog.findById(id).then((result)=>{
        res.render("details", {
            title: "blog-details",
            blog: result
        })
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  });
 
// 404
 
app.use((req, res)=>{
    
    res.status(404).render("404")
})
 

