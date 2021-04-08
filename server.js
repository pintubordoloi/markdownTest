const express = require('express');
const mongoose = require('mongoose');
const app = express();
const articleRouter = require('./routes/articles');
const Article = require('./models/article')
const methodOverride = require('method-override')

mongoose.connect('mongodb+srv://dango:dango123@cluster0.0lkqu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'))

const myName = 'dango';


app.get('/',async(req, res) =>{
    const articles = await Article.find().sort({createdAt: 'desc'});
    res.render('articles/index',{articles: articles});
    console.log(`${myName}`);
})

app.use('/articles', articleRouter);

app.listen(5000);