const express = require('express')
const mongoose = require('mongoose')

const authRouter = require('./controllers/auth')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const testingRouter = require('./controllers/testing')

const { MONGODB_URL } = require('./utils/config')
const { tokenExtractor, userExtractor } = require('./utils/middleware')

const app = express()

mongoose.connect(MONGODB_URL)

app.use(express.json())
app.use(tokenExtractor)
app.use(userExtractor)

app.use('/api/auth', authRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter)
}

module.exports = app