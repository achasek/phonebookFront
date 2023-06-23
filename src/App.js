import { useState, useEffect } from 'react';
import personServices from './services/persons';
import './index.css';
import Counter from './Counter';

const Notification = ({ message }) => {
  if(message === null) {
    return null
  }
  console.log(message, 'message')
  return (
    <div className='message'>
      <h2>{message}</h2>
    </div>
  )
}

const Filter = ({ search, handleSearch, handleSearchChange }) => {
  return (
    <>
      <h2>Search names</h2>
      <form onSubmit={handleSearch}>
        <input value={search} onChange={handleSearchChange} />
        <div>
          <button type="submit">Search</button>
        </div>
      </form>
    </>
  )
}

const AddToPhonebook = ({ newName, newNumber, handleNameChange, handleNumberChange, addPerson, edit, persons }) => {
  const names = persons.map(person => person.name.toLowerCase())
  const pendingPerson = persons.find(person => newName.toLowerCase() === person.name.toLowerCase())
  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={names.includes(newName.toLowerCase()) ? () => edit(pendingPerson.id, newName) : addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const DisplayPhonebook = ({ showAll, personsToShow, showBtn, handleDelete }) => {
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person => <li key={person.name}>{person.name} {person.number} <button onClick={() => handleDelete(person.id, person.name)}>Delete</button></li>)}
      </ul>
      <div>
        {showAll ? 
        <p></p>
        :
        <button onClick={showBtn}>Show All</button>}
      </div>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)
  // const validInput = new RegExp("^[0-9]*$");

  useEffect(() => {
    console.log('useEffect called')
    personServices
      .getAll()
      // the initialPersons value in .then can be named whatever, it just represents a successful get request
      // initialPersons would be the request.data from the getAll in persons.js
      .then(initialPersons => {
        console.log('promise fulfilled', initialPersons, 'response')
        setPersons(initialPersons)
      })
      // 2nd parameter is cb function in case of promise rejecting
      .catch(error => {
          console.log(error, 'promise rejected')
        })
  }, [])  

  // 2nd 'name' parameter is only being used to display name in window.confirm alert
  const edit = (id, name) => {
    const person = persons.find(person => person.id === id)
    const updatedPerson = {...person, number: newNumber}
    if (person.name.toLowerCase() === newName.toLowerCase() && person.number === newNumber) {
      setPersons(persons)
    } 
    else {
      if(window.confirm(`${name} already exists. Do you want to update their number?`)) {
        personServices
          .editPerson(id, updatedPerson)
          .then(returnedPerson => {
            console.log('edit hit')
            setMessage(`${person.name}'s number was updated`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          })
          // code prior to bringing backend error messages to the frontend
          // .catch(error => {
          //   console.log(error, 'error editting person')
          //   setMessage(`${person.name} was already removed from the database`)
          //   setTimeout(() => {
          //     setMessage(null)
          //   }, 5000)
          //   setPersons(persons.filter(person => person.id !== id))
          // })
          // UNFINISHED CODE - error msg doesnt display in instance of mongoose validation failure
          .catch(error => {
            console.log(error.response.data.error)
            setMessage(error.response.data.error)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== id))
          })
        }
    }
  }

  const addPerson = (event) => {
    // prevents default form submitting, which would cause re renders and problems in react
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    personServices
      .create(newPerson)
      .then(returnedPerson => {
        console.log(returnedPerson)
        setMessage(`${returnedPerson.name} was created`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setPersons(persons.concat(returnedPerson))
        setNewName('');
        setNewNumber('');
      })
      // THIS IS HOW TO DISPLAY BACKEND ERROR MSGS ON THE FRONTEND
      .catch(error => {
        console.log(error.response.data.error)
        setMessage(error.response.data.error)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })

  }

  const handleDelete = (id, name) => {
    if(window.confirm(`Are you sure that you want to delete ${name}?`)) {
    personServices
      .deletePerson(id)
      .then(response => {
        alert(`${name} deleted`)
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  const handleSearch = (event) => {
    event.preventDefault()
    const searchData = search
    setSearch(searchData)
    // fixes bug i had where hitting enter would sometimes show all instead of filter results
    showAll ?
      setShowAll(!showAll)
      :
      setShowAll(showAll)
    console.log(showAll)
  }

  // establishes a controlled input
  // the value for input is set to a state, the newName state
  // handleChange makes sure the newName state is being updated and kept in sync with the input field
  // this input would be read-only if not for this function
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    // validInput ?
    setNewNumber(event.target.value)
    // :
    // alert('invalid input')
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const personsToShow = 
    showAll ? 
    persons 
    :
    persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  const showBtn = () => {
    setShowAll(true);
    console.log(showAll)
  }

  return (
    <div>
      <Notification message={message} />
      <Filter search={search} handleSearch={handleSearch} handleSearchChange={handleSearchChange} />
      <AddToPhonebook newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson} persons={persons} edit={edit}/>
      <DisplayPhonebook showAll={showAll} personsToShow={personsToShow} showBtn={showBtn} persons={persons} handleDelete={handleDelete} />
      <Counter />
    </div>
  )
}

export default App