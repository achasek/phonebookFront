const SearchForm = ({ search, handleSearch, handleSearchChange }) => {
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

export default SearchForm