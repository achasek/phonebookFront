import axios from 'axios';
// old base url for json server
// const BASE_URL = 'http://localhost:3001/persons';
// new base url links to back end server when running locally
// because when we deployed the backend with the build folder of the frontend
// they now run on the same localhost / url
// so we can now leave out the localhost part and just put down a relative 
// url for our base url
// OLD BASE_URL -- USE FOR DEV SERVER THO
// const BASE_URL = 'http://localhost:3001/api/persons';
// BELOW ONLY WORKS ON LOCALHOST 3001 / BUILD (production) version
const BASE_URL = '/api/persons';

const getAll = () => {
    const request = axios.get(BASE_URL)
    // instead of sending the entire response object to the front end,
    // this extracts just the response.data, which is the only part used on the front
    return request.then(response => response.data)
}

const create = (newPerson) => {
    const request = axios.post(BASE_URL, newPerson)
    return request.then(response => response.data)
}

// delete HTTP request sends no data, so no object or request variable is needed
const deletePerson = (id) => {
    return axios.delete(`${BASE_URL}/${id}`)
}

const editPerson = (id, edittedPerson) => {
    const request = axios.put(`${BASE_URL}/${id}`, edittedPerson)
    return request.then(response => response.data)
}

const exports = {
    getAll, 
    create,
    deletePerson,
    editPerson
}

export default exports