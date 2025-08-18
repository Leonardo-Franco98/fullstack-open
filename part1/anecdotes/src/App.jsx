import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const AnecdoteInfo = ({anecdote, votes}) => {
  return (
    <>
      {anecdote}
      <p>has {votes} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const getMostVotesIndex = () => {
    let max = 0;
    let index = 0;

    for(let i = 0; i < votes.length; i++) {
      if (votes[i] > max) {
        max = votes[i]
        index = i
      }
    }

    return index
  }

  const handleClickNextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleClickVote = () => {
    let updatedVotes = [...votes]
    updatedVotes[selected]++
    setVotes(updatedVotes);
  }

  return (
    <>
      <div>
        <h1>Anecdote of the day</h1>
        <AnecdoteInfo anecdote={anecdotes[selected]} votes={votes[selected]} />
        <div>
          <Button text="Vote" onClick={handleClickVote} />
          <Button text="Next anecdote" onClick={handleClickNextAnecdote} />
        </div>
      </div>
      <div>
        <h1>Anecdote with the most votes</h1>
        <AnecdoteInfo anecdote={anecdotes[getMostVotesIndex()]} votes={votes[getMostVotesIndex()]} />
      </div>
    </>
  )
}

export default App