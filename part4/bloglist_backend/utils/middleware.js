const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (request, response, next) => {
    if (!request.headers['authorization']) return next()

    let token = null

    try {
        token = request.headers['authorization'].split(' ')[1]
    } catch {
        token = null
    }

    if (!token) return next()

    request.token = token

    next()
}

const userExtractor = async (request, response, next) => {
    if (!request.token) return next()

    let decodedToken = null

    try {
        decodedToken = jwt.verify(request.token, process.env.JWT_SECRET)
    } catch {
        decodedToken = null
    }

    if (!decodedToken || !decodedToken.id) return next()

    const user = await User.findById(decodedToken.id)

    request.user = user

    next()
}

module.exports = { tokenExtractor, userExtractor }