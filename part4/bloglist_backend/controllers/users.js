const router = require('express').Router()
const bcrypt = require('bcrypt');
const User = require('../models/user')

router.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs')

    res.json(users)
})

router.post('/', async (req, res) => {
    if (!(req.body.username && req.body.name && req.body.password)) {
        return res.status(400).json({ error: "Username, password and name are required to create a new user" })
    }

    if (req.body.username.length < 3 || req.body.password.length < 3) {
        return res.status(400).json({ error: "Username and password must be at least 3 characters long" })
    }

    const existsUsername = await User.find({ username: req.body.username })

    if (existsUsername.length > 0) {
        return res.status(400).json({ error: "A user with this username already exists" })
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 8)

    const newUser = User({
        name: req.body.name,
        username: req.body.username,
        passwordHash: hashedPassword
    })

    await newUser.save()

    res.status(201).end()
})

module.exports = router