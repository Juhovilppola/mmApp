import { useState, useEffect } from 'react'
import data from './data.json'
import './index.css'






const App = () => {

  const [persons, setPersons] = useState(
    [])
  const [games, setGames] = useState('')


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
    for (let i = 0; i < data.games.length; i++) {
      if (person.person.rivi[i] === data.games[i].result) {
        pisteet++
      }
    }
    console.log(person)
    return (

      <tr className='taulu'>
        <td className='taulu'>{person.person.name}</td>
        <td className='taulu'>{pisteet}</td>
        <td className='taulu'>{person.person.top3[0]}</td>
        <td className='taulu'>{person.person.top3[1]}</td>
        <td className='taulu'>{person.person.top3[2]}</td>
      </tr>

    )

  }
  const ShowPerson = (person) => {


    console.log(person)
    return (
      <th className='cell'>
        {person.person.name}
      </th>
    )

  }
  const ShowGamesAndRows = (game) => {
    console.log(game)
    let merkki = game.game.result
    console.log("merkki", merkki)
    if(merkki === 0){
      merkki = "X"
    }
    return (
      <tr>
        <td className='taulu'>
          {game.game.name}
        </td>
        {data.persons.map(person =>
          <ShowPlayerResult key={person.id} player={person} gameId={game.game.id} gameResult={game.game.result} />
        )}
        <td className='taulu'>{merkki}</td>
      </tr>
    )

  }
  const ShowPlayerResult = (props) => {
    console.log(props.player)
    console.log(props.gameId)
    console.log(props.gameResult)
    let merkki = props.player.rivi[props.gameId]
    if (merkki === 0) {
      merkki = 'X'
    }
    if (props.player.rivi[props.gameId] === props.gameResult) {
      return (
        <td className='taulu'>
          <div className='correct'>{merkki}</div>
        </td>
      )
    } else if (props.gameResult === null) {
      return (
        <td className='taulu'>
          {merkki}
        </td>
      )
    } else {
      return (
        <td className='incorrect'>
          {merkki}
        </td>
      )
    }
  }



  return (
    <div>
      <h2>Veikkaus</h2>
      <table className='taulu'>
        <tr className='taulu'>
          <th className='taulu'>Nimi</th>
          <th className='taulu'>Pisteet</th>
          <th className='taulu'>1.</th>
          <th className='taulu'>2.</th>
          <th className='taulu'>3.</th>
        </tr>
        {persons.map(person =>
          <ShowPersons key={person.id} person={person} />
        )}
      </table>
      <table className='taulu'>
        <tr className='taulu'>
          <th className='taulu'>Peli</th>
          {persons.map(person =>
            <ShowPerson key={person.id} person={person} />
          )}
          <th className='cell'>tulos</th>
        </tr>
        {data.games.map(game =>
          <ShowGamesAndRows key={game.id} game={game} />
        )}
      </table>

    </div>
  )




}

export default App
