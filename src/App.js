import { useState, useEffect } from 'react'
import data from './data.json'
import './index.css'
import axios from 'axios'
//import db from './db.json'



const api_url = "https://fixturedownload.com/feed/json/fifa-world-cup-2022/"


const App = () => {

  const [persons, setPersons] = useState(
    [])
  const [games, setGames] = useState([])
  let id = -1


  useEffect(() => {
    console.log('effect games')
       axios
       .get(api_url)
       .then(response => {
         console.log("promise fulfilled")
         console.log(response)
         setGames(response.data)
         
       })
    //setGames(db)

  }, [])
  useEffect(() => {
    console.log('effect')
    setPersons(data.persons)

  }, [])
  console.log("persons", persons)
  console.log("data", data)
  console.log("games", games)



  const ShowPersons = (person) => {
    let pisteet = 0
    let merkki = ''
    console.log("Pisteet", person.person.name)
    for (let i = 0; i < data.games.length; i++) {
      if (games[i].HomeTeamScore !== null) {
        if (games[i].HomeTeamScore > games[i].AwayTeamScore) {
          merkki = 1
        } else if (games[i].HomeTeamScore < games[i].AwayTeamScore) {
          merkki = 2
        } else {
          merkki = 0
        }
        console.log(merkki, person.person.rivi[i], games[i].HomeTeam)

        if (person.person.rivi[i] === merkki) {
          pisteet++
          console.log("piste")
        }
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
    id = id + 1
    console.log(game)
    let result = ''
    const home = game.game.HomeTeamScore
    const away = game.game.AwayTeamScore
    if (home > away) {
      result = 1
    } else if (home < away) {
      result = 2
    } else {
      result = 0
    }



    if (away === null) {
      result = null
    }
    if (game.game.Group === null) {
      return
    }

    return (
      <tr>
        <td className='taulu'>
          {game.game.HomeTeam} - {game.game.AwayTeam}
        </td>
        {data.persons.map(person =>
          <ShowPlayerResult key={person.id} player={person} gameId={id} gameResult={result} />
        )}
        <td className='taulu'>{game.game.HomeTeamScore} - {game.game.AwayTeamScore}</td>
      </tr>
    )

  }
  const ShowPlayerResult = (props) => {
    console.log("tulostetaan rivit")
    console.log(props.player.name)
    console.log(props.gameId)
    console.log(props.gameResult)
    let merkki = props.player.rivi[props.gameId]
    console.log("merkki: " + merkki)
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
        {games.map(game =>
          <ShowGamesAndRows key={game.MatchNumber} game={game} />
        )}
      </table>

    </div>
  )




}

export default App
