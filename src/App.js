import { useState, useEffect } from 'react'
import data from './data.json'
import './index.css'






const App = () => {

  const [persons, setPersons] = useState(
    [])
  const [games, setGames] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

 
  useEffect(() => {
    console.log('effect')
    setPersons(data.persons)
    setGames(data.games)
  }, [])
  console.log("persons", persons)
  console.log("data", data)
  console.log("games", games)


 
  const ShowPersons = (person) => {
    let pisteet = 0
    for(let i = 0; i< data.games.length;i++){
      if(person.person.rivi[i] === data.games[i].result){
        pisteet++
      }
    }
    console.log(person)
      return (
        <li>
          {person.person.name} {pisteet}
          
  
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
        {data.persons.map(person =>
          <ShowPlayerResult key={person.id} player={person} gameId={game.game.id} gameResult={game.game.result}/>
          )}
          <td className='taulu'>{game.game.result}</td>
        </tr>
      )
    
  }
  const ShowPlayerResult = (props) => {
    console.log(props.player)
    console.log(props.gameId)
    console.log(props.gameResult)
    let merkki = props.player.rivi[props.gameId]
    if(merkki === 0){
      merkki = 'X'
    }
    if(props.player.rivi[props.gameId] === props.gameResult){
      return(
        <td className='taulu'>
          <div className='correct'>{merkki}</div>
        </td>
      )
    } else if (props.gameResult === null) {
      return(
      <td className='taulu'>
        {merkki}
        </td>
      )
    } else {
      return(
      <td className='incorrect'>
        {merkki}
        </td>
      )
    }
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
          <th className='taulu'>tulos</th>
        </tr>
        {data.games.map(game =>
        <ShowGamesAndRows key={game.id} game={game}/>
      )}
      </table>

    </div>
  )
        
        
        

}

export default App
