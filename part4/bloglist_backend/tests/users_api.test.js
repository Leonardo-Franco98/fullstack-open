/*const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const User = require('../models/user')
const { initialUsers, allUsers } = require('../utils/test_helpers/user_api_test_helper')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(initialUsers)
})

test('POST /api/users when trying to create a user without a name a new user is not created and status code 400 is sent', async () => {
    let newUserData = {
        username: "newusername",
        password: "newpassword"
    }

    let usersStart = await allUsers()

    const result = await api.post('/api/users').send(newUserData)
        .expect(400)

    let usersEnd = await allUsers()

    assert.strictEqual(usersStart.length, usersEnd.length)

    assert.strictEqual("Username, password and name are required to create a new user", result.body.error)
})

test('POST /api/users when trying to create a user without a username a new user is not created and status code 400 is sent', async () => {
    let newUserData = {
        name: "newname",
        password: "newpassword"
    }

    let usersStart = await allUsers()

    const result = await api.post('/api/users').send(newUserData)
        .expect(400)

    let usersEnd = await allUsers()

    assert.strictEqual(usersStart.length, usersEnd.length)

    assert.strictEqual("Username, password and name are required to create a new user", result.body.error)
})

test('POST /api/users when trying to create a user without a password a new user is not created and status code 400 is sent', async () => {
    let newUserData = {
        username: "newusername",
        name: "newname"
    }

    let usersStart = await allUsers()

    const result = await api.post('/api/users').send(newUserData)
        .expect(400)

    let usersEnd = await allUsers()

    assert.strictEqual(usersStart.length, usersEnd.length)

    assert.strictEqual("Username, password and name are required to create a new user", result.body.error)
})

test('POST /api/users when trying to create a user with a username shorter than 3 characters a new user is not created and status code 400 is sent', async () => {
    let newUserData = {
        username: "a",
        name: "newname",
        password: "newpassword"
    }

    let usersStart = await allUsers()

    const result = await api.post('/api/users').send(newUserData)
        .expect(400)

    let usersEnd = await allUsers()

    assert.strictEqual(usersStart.length, usersEnd.length)

    assert.strictEqual("Username and password must be at least 3 characters long", result.body.error)
})

test('POST /api/users when trying to create a user with a password shorter than 3 characters a new user is not created and status code 400 is sent', async () => {
    let newUserData = {
        username: "newusername",
        name: "newname",
        password: "a"
    }

    let usersStart = await allUsers()

    const result = await api.post('/api/users').send(newUserData)
        .expect(400)

    let usersEnd = await allUsers()

    assert.strictEqual(usersStart.length, usersEnd.length)

    assert.strictEqual("Username and password must be at least 3 characters long", result.body.error)
})

test('POST /api/users when trying to create a user with valid data, a new user is created', async () => {
    let newUserData = {
        username: "newusername",
        name: "newname",
        password: "newpassword"
    }

    let usersStart = await allUsers()

    await api.post('/api/users').send(newUserData)
        .expect(201)

    let usersEnd = await allUsers()

    assert.strictEqual(usersStart.length + 1, usersEnd.length)

    assert(usersEnd.some(u => u.username === newUserData.username))
})

after(async () => await mongoose.connection.close())*/