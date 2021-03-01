const express = require('express');
const router = express.Router();
const Article = require('./../models/article');


router.get('/new',(req,res)=>{
    res.render('articles/new',{article:new Article()});
})

router.get('/:slug',async(req,res)=>{
    const article = await Article.findOne({slug:req.params.slug});
    console.log(article);
    if(article==null) res.redirect('/');
    res.render('articles/show',{article:article});
})

router.get("/edit/:slug",async (req,res)=>{
    const article = await Article.findOne({slug:req.params.slug})
    res.render('articles/edit',{article:article})
})

router.post('/',async(req,res,next)=>{
   req.article = new Article()
   next()
},saveArticleAndRedirect('new'))


router.put('/:slug', async (req, res, next) => {
    req.article = await Article.findOne({slug:req.params.slug})
    next()
  }, saveArticleAndRedirect('edit'))

router.delete('/:id',async (req,res)=>{
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/');
})



function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article
    article.title = req.body.title
    article.description = req.body.description
    article.markdown = req.body.markdown
    try {
      article = await article.save()
      res.redirect(`/articles/${article.slug}`)
    } catch (e) {
      res.render(`articles/${path}`, { article: article })
    }
  }
}



/*let article = new Article({
    title:req.body.title,
    description:req.body.description,
    markdown:req.body.markdown
})
try{
    article = await article.save();
    res.redirect(`articles/${article.slug}`)

}catch(e){
    res.render('articles/new',{article:article});
}*/

module.exports = router;