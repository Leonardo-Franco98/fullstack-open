import Person from "./Person"

const PersonList = ({ persons, handleDelete }) => {
    return (
        <ul>
            {persons.map(p => <Person key={p.id} person={p} handleDelete={() => handleDelete(p.id)} />)}
        </ul>
    )
}

export default PersonList