import axios from "axios"

const getAllPersons = () => {
    return axios.get("http://localhost:3001/persons")
        .then(resp => resp.data)
}

const createPerson = (newPerson) => {
    return axios.post("http://localhost:3001/persons", newPerson)
        .then(resp => resp.data)
} 

const updatePerson = (id, newPerson) => {
    return axios.put(`http://localhost:3001/persons/${id}`, newPerson)
        .then(resp => resp.data)
}

const deletePerson = (id) => {
    return axios.delete(`http://localhost:3001/persons/${id}`)
        .then(resp => resp.data)
}

export default { getAllPersons, createPerson, updatePerson, deletePerson }