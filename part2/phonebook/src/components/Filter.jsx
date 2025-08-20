const Filter = ({ handleFilterChange }) => {
    return (
        <div>
            <p>filter phonebook entries:</p>
            <input type="text" onChange={handleFilterChange} />
        </div>
    )
}

export default Filter