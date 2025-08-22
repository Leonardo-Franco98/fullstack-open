import axios from "axios"

const baseUrl = "http://localhost:3001/api/persons"

const getAllPersons = () => {
    return axios.get(baseUrl)
        .then(resp => resp.data)
}

const createPerson = (newPerson) => {
    return axios.post(baseUrl, newPerson)
        .then(resp => resp.data)
} 

const updatePerson = (id, newPerson) => {
    return axios.put(`${baseUrl}/${id}`, newPerson)
        .then(resp => resp.data)
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
        .then(resp => resp.data)
}

export default { getAllPersons, createPerson, updatePerson, deletePerson }