import { useState, useEffect } from 'react'
import Notification from './components/notification/Notification.jsx'
import Filter from './components/Filter'
import AddPersonForm from './components/AddPersonForm'
import PersonList from './components/PersonList'
import personsService from './services/persons.js'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    personsService.getAllPersons()
      .then((data) => {
        setPersons(data)
      })
  }, [])

  const personsToDisplay = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    let newPerson = {
      name: newName,
      number: newNumber
    }

    if (persons.some(p => p.name == newPerson.name)) {
      let confirmUpdate = window.confirm(`${newPerson.name} is already in the phonebook, do you want to replace the old number with a new one?`)
      if (!confirmUpdate) {
        resetForm()
        return
      }

      let id = persons.find(p => p.name == newPerson.name).id
      newPerson.id = id

      personsService.updatePerson(id, newPerson)
        .then(data => {
          setPersons(persons.map(p => p.id === id ? data : p))

          setSuccess(true)
          setNotificationMessage(`Information for ${newPerson.name} updated successfully!`)
          setTimeout(() => setNotificationMessage(''), 5000)
        })
        .catch(error => {
          console.log(error)

          setPersons(persons.filter(p => p.id !== id))

          setSuccess(false)
          setNotificationMessage(`Information of ${newPerson.name} has already been removed from the server!`)
          setTimeout(() => setNotificationMessage(''), 5000)
        })

      resetForm()
      return
    }

    personsService.createPerson(newPerson)
      .then(data => {
        setPersons([...persons, data])

        setSuccess(true)
        setNotificationMessage(`Information for ${newPerson.name} added to the phonebook successfully!`)
        setTimeout(() => setNotificationMessage(''), 5000)
      })

    resetForm()
  }

  const handleDelete = (id) => {
    let name = persons.find(p => p.id === id).name
    let confirmDelete = window.confirm(`Are you sure you want to delete ${name}?`)

    if (!confirmDelete) return

    personsService.deletePerson(id)
      .then(data => {
        setPersons(persons.filter(p => p.id !== data.id))

        setSuccess(true)
        setNotificationMessage(`Information for ${name} deleted successfully!`)
        setTimeout(() => setNotificationMessage(''), 5000)
      })
  }

  const resetForm = () => {
    setNewName("")
    setNewNumber("")
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} success={success} />
      <Filter handleFilterChange={handleFilterChange} />
      <h2>Add a new number</h2>
      <AddPersonForm 
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <PersonList persons={personsToDisplay} handleDelete={handleDelete} />
    </div>
  )
}

export default App