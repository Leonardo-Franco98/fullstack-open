const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', async (request, response) => {
    let blogs = await Blog.find({}).populate('user')
    response.json(blogs)
})

router.get('/:id', async (request, response) => {
    let blog = await Blog.find({ _id: request.params.id }).populate('user')
    
    if (blog.length === 0) response.status(404).json({ error: "Could not find this blog" })
    else response.json(blog) 
})

router.post('/', async (request, response) => {
    if (!request.user) return response.status(401).json({ error: 'Missing token' })

    const user = request.user

    if (!request.body.title || !request.body.url) {
        return response.status(400).json({ error: "Blog title and url are required to create a new blog" })
    }

    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes || 0,
        user: user._id
    })

    let result = await blog.save()

    user.blogs.push(result.id)

    await user.save()

    response.status(201).json(result)
})

router.put('/:id', async (request, response) => {
    if (!request.body.title || !request.body.url) {
        return response.status(400).json({ error: "Blog title and url are required to create a new blog" })
    }

    let blogToUpdate = await Blog.find({ _id: request.params.id }) 

    if (blogToUpdate.length === 0) return response.status(404).json({ error: "Could not find this blog" })

    blogToUpdate = blogToUpdate[0]
    blogToUpdate.title = request.body.title
    blogToUpdate.author = request.body.author
    blogToUpdate.url = request.body.url
    blogToUpdate.likes = request.body.likes || 0

    await blogToUpdate.save()

    response.send(blogToUpdate)
})

router.delete('/:id', async (request, response) => {
    if (!request.user) return response.status(401).json({ error: 'Missing token' })

    const user = request.user
        
    let blogToDelete = await Blog.find({ _id: request.params.id }) 

    if (blogToDelete.length === 0) return response.status(404).json({ error: "Could not find this blog" })

    if (user._id.toString() !== blogToDelete[0].user.toString()) {
        response.status(403).end()
    }

    await Blog.deleteOne({ _id: request.params.id })

    response.json(blogToDelete)
})

module.exports = router