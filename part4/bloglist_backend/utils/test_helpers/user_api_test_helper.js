const User = require('../../models/user')

const initialUsers = [
  {
    name: "Leonardo Franco",
    username: "admin",
    password: "amongus"
  },
  {
    name: "New user 23",
    username: "user23",
    password: "123123123"
  },
  {
    name: "Zezoca",
    username: "zezoca",
    password: "heheheha"
  }
]

const allUsers = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = { initialUsers, allUsers }