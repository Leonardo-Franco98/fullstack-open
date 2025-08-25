const mongoose = require("mongoose")

if (process.argv.length < 3) {
    console.log("Enter your mongodb connection password as an argument")
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://leonardofranco:${password}@fullstackopen.3nwewnt.mongodb.net/?retryWrites=true&w=majority&appName=FullstackOpen`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model("Person", personSchema)

if (process.argv.length == 3) {
    Person.find({})
        .then((result) => {
            console.log("Phonebook:")
            result.forEach(p => {
                console.log(`${p.name} - ${p.number}`)
            })
            process.exit(0)
        })
} else {
    if (process.argv.length != 5) {
        console.log("Enter the name and number for the new entry for the phonebook as arguments")
        process.exit(1)
    }

    const newPerson = Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    newPerson.save()
        .then((result) => {
            console.log(`${process.argv[3]} saved successfully in the phonebook`)
            mongoose.connection.close()
            process.exit(0)
        })
}