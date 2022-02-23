const Blog = require('../models/Blog')
const blog_index = (req, res) => {
    Blog.find().sort({
        createdAt: -1
    }).then(result => {
        res.render('index', {
            title: 'Blogs',
            blogs: result
        })
    }).catch(err => {
        console.log(err.message)
    })
}
const blog_create_get = (req, res) => {
    res.render('create', {
        title: 'New Blogs'
    })
}
const blog_create_post = (req, res) => {
    const blog = new Blog(req.body)
    blog.save().then(result => {
        res.redirect('/blogs')
    }).catch(err => {
        console.log(err.message)
    })
}

const blog_details = (req, res) => {
    const id = req.params.id;
    console.log(id)
    Blog.findById(id).then(result => {
        res.render('details', {
            title: 'Blogs Details',
            blog: result
        })
    }).catch(err => {
        res.render('404',{title:404})
    })
}



const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id).then(result => {
        res.json({
            redirect: '/blogs'
        })
    }).catch(err => {
        console.log(err.message)
    })
}
module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}