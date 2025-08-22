const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const app = express()

app.use(cors())
app.use(express.json())

morgan.token("body", function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))


let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/info", (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
})

app.get("/api/persons", (req, res) => {
    res.json(persons)
})

app.get("/api/persons/:id", (req, res) => {
    let person = persons.find(p => p.id === req.params.id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.post("/api/persons", (req, res) => {
    if (!req.body.name || !req.body.number) {
        return res.status(400).json(
            { error: "Name and number are required to create a new entry in the phonebook" }
        )
    }

    if (persons.find(p => p.name === req.body.name)) {
        return res.status(400).json(
            { error: "There already exists an entry with this name in the phonebook" }
        )
    }

    const newPerson = {
        id: Math.ceil(Math.random() * 999999999).toString(),
        name: req.body.name,
        number: req.body.number
    }

    persons = [...persons, newPerson]

    res.status(201).json(newPerson)
})

app.delete("/api/persons/:id", (req, res) => {
    let person = persons.find(p => p.id === req.params.id)
    persons = persons.filter(p => p.id !== req.params.id)

    res.status(200).json(person)
})

const port = 3001
app.listen(port, () => console.log(`Listening to request on port ${port}...`))