const mongoose = require("mongoose")
require("dotenv").config()

const url = process.env.MONGODB_URL

mongoose.set('strictQuery',false)

mongoose.connect(url)
    .then(result => {
        console.log("Connected to mongodb database with success")
    })
    .catch(error => {
        console.log("An error occurred while trying to connect to mongogb database - ", error)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: [true, "Name is required"]
    },
    number: {
        type: String,
        validate: {
            validator: (value) => {
                return /\d{2,3}-\d+/.test(value) && value.length >= 9
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, "Phone number is required"]
    }
})

personSchema.set("toJSON", {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = mongoose.model("Person", personSchema)