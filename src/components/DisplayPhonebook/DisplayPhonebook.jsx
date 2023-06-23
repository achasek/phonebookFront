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

export default DisplayPhonebook