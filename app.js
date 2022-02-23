const express = require('express')
const morgan = require('morgan');
const app= express();
const mongoose = require('mongoose');

const { router } = require('./routes/blogRoutes');
const dbURI='mongodb+srv://netninja:test1234@nodetuts.szgxu.mongodb.net/node-tuts?retryWrites=true&w=majority'

//connect to database
mongoose.connect(dbURI).then((result)=>{
    console.log('Connected to DB')
    app.listen(2000)
}).catch(err=>{
    console.log(err.message)
})
//regiser view engine
//checks insed views folder
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(morgan('common'));
//middleware static files that we want to make public
app.use(express.static('public-folder'))

//blog routes
app.use('/blogs',router)

app.get('/',(req,res)=>{
  res.redirect('/blogs')
})


app.get('/about',(req,res)=>{
    res.render('about', {title:'About'})
})


app.use((req,res)=>{
    res.status(404).render('404',{title:'404'})
})



