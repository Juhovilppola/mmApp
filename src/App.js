import { useState, useEffect } from 'react'
import data from './data.json'
import './index.css'





const App = () => {

  const [persons, setPersons] = useState([])
  const [games, setGames] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

 
  useEffect(() => {
    console.log('effect')
    setPersons(data.persons)
    setGames(data.games)
  }, [])
  console.log(persons)
  console.log(data)


  const personsToShow = false
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setGames(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }


  


  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    if (!message.error) {
      return (
        <div className="noterror">
          {message.message}
        </div>
      )
    } else {
      return (
        <div className="error">
          {message.message}
        </div>
      )
    }
  }
  const ShowPersons = (person) => {
    console.log(person)
      return (
        <li>
          {person.person.name} {person.person.number} {person.button}
          
  
        </li>
      )
    
  }
  const ShowPerson = (person) => {
    console.log(person)
      return (
        <th className='taulu'>
          {person.person.name} 
          
  
        </th>
      )
    
  }
  const ShowGamesAndRows = (game) => {
    console.log(game)
      return (
        <tr>
        <td className='taulu'>
          {game.game.name} 
        </td>
        <td className='taulu'>
          {persons[0].rivi[game.game.id]}
        </td>
        <td className='taulu'>
          {persons[1].rivi[game.game.id]}
        </td>
        </tr>
      )
    
  }


  return (
    <div>
      <h2>Veikkaus</h2>
      <ul>
        {persons.map(person =>
          <ShowPersons key={person.id} person={person} />
        )}
      </ul>
      <table className='taulu'>
        <tr className='taulu'>
          <th className='taulu'>peli</th>
          {persons.map(person => 
          <ShowPerson key={person.id} person={person}/>
          )}
        </tr>
        {games.map(game =>
        <ShowGamesAndRows key={game.id} game={game}/>
      )}
      </table>

    </div>
  )

}

export default App
