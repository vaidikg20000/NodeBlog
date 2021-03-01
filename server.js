const express = require('express');
const app = express();
const ejs =  require("ejs");
const articleRouter = require('./routes/articles');
const Article = require('./models/article');
const methodOverride = require('method-override');
const mongoose = require('mongoose'); 

mongoose.connect('mongodb://localhost/blog',{ useNewUrlParser: true , useUnifiedTopology:true, useCreateIndex:true });


app.use(express.static("public"));
app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'))
app.use('/articles',articleRouter);

app.get('/',async(req,res)=>{
   const articles = await Article.find().sort({createdAt:'desc'});
    res.render('articles/index',{article:articles});
});

app.listen('3000',(req,res)=>{
    console.log('server running at 3000');
});