import { useState, useEffect } from 'react'
import data from './data.json'
import './index.css'
import axios from 'axios'
//import db from './db.json'


//url mistä haetaan pelien data
const api_url = "https://raw.githubusercontent.com/openfootball/euro.json/master/2024/euro.json"


const App = () => {
  //luodaan muuttujat mitä tarvitaan
  const [persons, setPersons] = useState(
    [])
  const [games, setGames] = useState([])


  // haetaan data peleistä
  useEffect(() => {
    console.log('effect games')
    axios
      .get(api_url)
      .then(response => {
        setGames(response.data)
        console.log("promise fulfilled")
        console.log(response)

      })
    //setGames(db)

  }, [])
  //lisätään käyttäjien data json tiedostosta
  useEffect(() => {
    console.log('effect')
    setPersons(data.persons)

  }, [])
  console.log("persons", persons)
  console.log("data", data)
  console.log("games", games)


  //palauttaa html taulukon missä näkyy pelaajien pisteet, ja top3 joukkueet
  const ShowPersons = (person) => {
    let pisteet = 0
    let merkki = ''
    console.log("Pisteet", person.person.name)
    //lasketaan pisteet
    for (let i = 0; i < games.length; i++) {
      if (games[i].home_team.goals !== null) {
        if (games[i].home_team.goals > games[i].away_team.goals) {
          merkki = 1
        } else if (games[i].home_team.goals < games[i].away_team.goals) {
          merkki = 2
        } else {
          merkki = 0
        }
        console.log(merkki, person.person.rivi[i], games[i].home_team.name)

        if (person.person.rivi[games[i].id - 1] === merkki) {
          pisteet++
          console.log("piste")
        }
      }
    }
    console.log(person)
    // palautetaan html taulukko
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
  //palauttaa pelaajan nimen
  const ShowPerson = (person) => {


    console.log(person)
    return (
      <th className='cell'>
        {person.person.name}
      </th>
    )

  }
  // päätaulukko jossa näkyy pelaajien rivit sekä pelien tulokset
  const ShowGamesAndRows = (game) => {
    // selvitetään tulos 1x2 formaattiin jossa 0 vastaa x tulosta
    console.log(game)
    let result = ''
    const home = game.game.home_team.goals
    const away = game.game.away_team.goals
    if (home > away) {
      result = 1
    } else if (home < away) {
      result = 2
    } else {
      result = 0
    }


    //peli datassa on ylimääräisiä pelejä joten hoidetaan että ne ei tulostu ja ei tulosteta alkamattomien pelien tuloksia
    if (away === null) {
      result = null
    }
    /*if (game.game.stage_name !== "First stage") {
      return
    }*/

    return (
      <tr>
        <td className='taulu'>
          {game.game.home_team.name} - {game.game.away_team.name}
        </td>
        {data.persons.map(person =>
          <ShowPlayerResult key={person.id} player={person} gameId={game.game.id - 1} gameResult={result} />
        )}
        <td className='taulu'>{game.game.home_team.goals} - {game.game.away_team.goals}</td>
      </tr>
    )

  }
  //palauttaa pelaajien veikkaukset tiettyyn peliin sekä pelin oikean tuloksen
  const ShowPlayerResult = (props) => {
    console.log("tulostetaan rivit")
    console.log(props.player.name)
    console.log(props.gameId)
    console.log(props.gameResult)
    let merkki = props.player.rivi[props.gameId]
    console.log("merkki: " + merkki)
    //pelaajien datassa x on korvatt 0 ja se muutetaan tässä
    if (merkki === 0) {
      merkki = 'X'
    }
    //tulostetaan pelaajien veikkaukset ja eri värit sekä oikein että väärin menneille ja alkamattomille peleille.
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

  if (games !== null) {

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




}

export default App
