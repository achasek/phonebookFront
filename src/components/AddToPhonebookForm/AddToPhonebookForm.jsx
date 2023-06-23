const AddToPhonebookForm = ({ newName, newNumber, handleNameChange, handleNumberChange, addPerson, edit, persons }) => {
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

export default AddToPhonebookForm