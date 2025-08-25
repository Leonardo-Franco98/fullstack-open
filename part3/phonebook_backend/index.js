const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', function (req) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/info', (req, res, next) => {
  Person.find({})
    .then(result => {
      res.send(`<p>Phonebook has info for ${result.length} people</p><p>${new Date()}</p>`)
    })
    .catch(error => next(error))
})

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(result => {
      res.json(result)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(result => {
      if (!result) {
        return res.status(404).json({ error: 'Could not find a person with this id in the phonebook' })
      }

      res.json(result)
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  if (!req.body.name || !req.body.number) {
    return res.status(400).json(
      { error: 'Name and number are required to create a new entry in the phonebook' }
    )
  }

  const newPerson = Person({
    name: req.body.name,
    number: req.body.number
  })

  newPerson.save()
    .then(result => {
      res.status(201).json(result)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  if (!req.body.name || !req.body.number) {
    return res.status(400).json(
      { error: 'Name and number are required to update an entry in the phonebook' }
    )
  }

  Person.findById(req.params.id)
    .then(result => {
      if (!result) {
        return res.status(404).json({ error: 'Could not find a person with this id in the phonebook' })
      }

      result.name = req.body.name
      result.number = req.body.number

      result.save()
        .then(result => {
          res.json(result)
        })
        .catch(error => next(error))
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      if (!result) {
        return res.status(404).json({ error: 'Could not find a person with this id in the phonebook' })
      }

      res.status(200).json(result)
    })
    .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
  console.log(error)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Listening to request on port ${port}...`))