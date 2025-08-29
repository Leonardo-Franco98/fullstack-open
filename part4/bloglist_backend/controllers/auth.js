const router = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
require('dotenv').config()

router.post('/', async (req, res) => {
    if (!(req.body.username && req.body.password)) {
        return res.status(401).json({ error: "Username and password are required to login" })
    }

    let user = await User.find({ username: req.body.username })

    if (user.length === 0) {
        return res.status(401).json({ error: "Username does not exist" })
    }

    let correctPassword = await bcrypt.compare(req.body.password, user[0].passwordHash)

    if (!correctPassword) {
        return res.status(401).json({ error: "Username/password combination is not correct" })
    }

    const tokenData = {
        username: user[0].username,
        id: user[0]._id,
    }

    const token = jwt.sign(tokenData, process.env.JWT_SECRET)

    res.status(201).json({ token })
})

module.exports = router