const Filter = ({ search, handleSearchChange }) => {
    return (
        <div>
            <p>Find countries:</p>
            <input type="text" value={search} onChange={handleSearchChange} />
        </div>
    )
}

export default Filter