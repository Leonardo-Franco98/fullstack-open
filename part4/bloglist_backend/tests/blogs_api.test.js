const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const { initialBlogs, allBlogs, nonExistingId } = require('../utils/test_helpers/blog_api_test_helper')
require('dotenv').config()

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})


test('GET /api/blogs returns json', async () => {
    await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('GET /api/blogs unique identifier is called "id"', async () => {
    let blogs = await api.get('/api/blogs')

    assert.strictEqual(true, blogs.body.every(b => !b._id && b.id))
})

test('POST /api/blogs when trying to create a blog without providing a token response status code is 401 and blog is not created', async () => {
    let newBlogData = {
        title: 'new blog created for testing purposes',
        author: 'Leonardo Franco',
        url: 'test.blog.com/1',
        likes: 2
    }

    await api.post('/api/blogs')
        .send(newBlogData)
        .expect(401)

    let blogs = await allBlogs()

    assert.strictEqual(initialBlogs.length, blogs.length)

    assert.strictEqual(false, blogs.some(b => b.title === newBlogData.title))
})

test('POST /api/blogs creates new blog document in database from valid blog object', async () => {
    let newBlogData = {
        title: 'new blog created for testing purposes',
        author: 'Leonardo Franco',
        url: 'test.blog.com/1',
        likes: 2
    }

    await api.post('/api/blogs')
        .set('authorization', `Bearer ${process.env.JWT_TOKEN}`)
        .send(newBlogData)
        .expect(201)

    let blogs = await allBlogs()

    assert.strictEqual(initialBlogs.length + 1, blogs.length)

    assert.strictEqual(true, blogs.some(b => b.title === newBlogData.title))
})

test('POST /api/blogs if "likes" property is omitted, new blog document is created with the property defaulted to 0', async () => {
    let newBlogData = {
        title: 'new blog created for testing purposes 2',
        author: 'Leonardo Franco',
        url: 'test.blog.com/1'
    }

    await api.post('/api/blogs')
        .set('authorization', `Bearer ${process.env.JWT_TOKEN}`)
        .send(newBlogData)

    let blogs = await allBlogs()
    let createdBlog = blogs.find(b => b.title === newBlogData.title)

    assert.strictEqual(0, createdBlog.likes)
})

test('POST /api/blogs if "title" propert is omitted, response status code is 400 and new blog is not created', async () => {
    let newBlogData = {
        author: 'Leonardo Franco',
        url: 'test.blog.com/1',
        likes: 3
    }

    await api.post('/api/blogs')
        .set('authorization', `Bearer ${process.env.JWT_TOKEN}`)
        .send(newBlogData)
        .expect(400)
})

test('POST /api/blogs if "url" propert is omitted, response status code is 400 and new blog is not created', async () => {
    let newBlogData = {
        title: 'new blog created for testing purposes 3',
        author: 'Leonardo Franco',
        likes: 3
    }

    await api.post('/api/blogs')
        .set('authorization', `Bearer ${process.env.JWT_TOKEN}`)
        .send(newBlogData)
        .expect(400)
})

test('PUT /api/blogs if "title" propert is omitted, response status code is 400 and new blog is not created', async () => {
    let newBlogData = {
        author: 'Leonardo Franco',
        url: 'test.blog.com/1',
        likes: 3
    }

    let id = await nonExistingId()
    await api.put(`/api/blogs/${id}`)
        .send(newBlogData)
        .expect(400)
})

test('PUT /api/blogs if "url" propert is omitted, response status code is 400 and new blog is not created', async () => {
    let newBlogData = {
        title: 'new blog created for testing purposes 3',
        author: 'Leonardo Franco',
        likes: 3
    }

    let id = await nonExistingId()
    await api.put(`/api/blogs/${id}`)
        .send(newBlogData)
        .expect(400)
})

test('PUT /api/blogs/:id if id does not exist response status code is 404', async () => {
    let newBlogData = {
        title: 'updated blog test',
        author: 'Leonardo Franco',
        url: 'test.blog.com/11111'
    }

    let id = await nonExistingId()
    await api.put(`/api/blogs/${id}`)
        .send(newBlogData)
        .expect(404)
})

test('PUT /api/blogs/:id updates the blog correctly if the id exists and all required data is sent', async () => {
    let newBlogData = {
        title: 'updated blog test success',
        author: 'Leonardo Chavarria Franco',
        url: 'test.blog.com/999',
        likes: 999
    }

    let blogs = await allBlogs()
    let id = blogs[0].id

    await api.put(`/api/blogs/${id}`)
        .send(newBlogData)

    blogs = await allBlogs()
    assert.strictEqual(true, blogs.some(b => {
        return b.title === newBlogData.title &&
            b.author === newBlogData.author &&
            b.url === newBlogData.url &&
            b.likes === newBlogData.likes &&
            b.id === id
    }))
})

test('DELETE /api/blogs/:id when trying to delete a blog without providing a token the response status code is 401 and blog is not deleted', async () => {
    let blogsStart = await allBlogs()
    let id = blogsStart[0].id

    await api.delete(`/api/blogs/${id}`)
        .expect(401)

    let blogsEnd = await allBlogs()

    assert.strictEqual(blogsEnd.length, blogsStart.length)

    assert.strictEqual(true, blogsEnd.some(b => b.id == id))
})

test('DELETE /api/blogs/:id if id does not exist response status code is 404', async () => {
    let id = await nonExistingId()
    await api.delete(`/api/blogs/${id}`)
        .set('authorization', `Bearer ${process.env.JWT_TOKEN}`)
        .expect(404)
})

test('DELETE /api/blogs/:id deletes the blog correctly if the id exists', async () => {
    let blogsStart = await allBlogs()
    let id = blogsStart[0].id

    await api.delete(`/api/blogs/${id}`)
        .set('authorization', `Bearer ${process.env.JWT_TOKEN}`)

    let blogsEnd = await allBlogs()

    assert.strictEqual(blogsEnd.length, blogsStart.length - 1)

    assert.strictEqual(false, blogsEnd.some(b => b.id == id))
})

after(async () => await mongoose.connection.close())