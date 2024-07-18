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

  //let tempgames = []
  //const [games2, setGames2] = useState([])
  //const [games3, setGames3] = useState([])

  //let array = []
  // haetaan data peleistä
  useEffect(() => {
    console.log('effect games')
    axios
      .get(api_url)
      .then(response => {
        //tempgames = games.concat(response.data.rounds[0], response.data.rounds[1], response.data.rounds[2])

        //setGames(response.data.rounds)
        //array = array.concat(response.data.rounds[0].matches, response.data.rounds[1].matches, response.data.rounds[2].matches)
        //array.sort((a, b) => a.time - b.time)
        setGames(data.games)


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
      if (games[i].result !== null) {
        /*console.log(games[i].score.ft)
        console.log('lol')
        if (games[i].score.ft[0] > games[i].score.ft[1]) {
          merkki = 1
        } else if (games[i].score.ft[0] < games[i].score.ft[1]) {
          merkki = 2
        } else {
          merkki = 0
        }
        console.log(merkki, person.person.rivi[i], games[i].team1)*/

        if (person.person.rivi[i] === games[i].result) {
          pisteet++
          console.log("piste")
          console.log(games[i].name)
          if (person.person.name != "Juho") {
            pisteet = 0 
            }
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
        <td className='taulu'>{person.person.top3[3]}</td>
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
    console.log('peliä')
    let result = game.game.result
    /*let home = 0
    let away = 0
    if (!game.game.score.ft) {
      result = null

    } else {

      home = game.game.score.ft[0]
      away = game.game.score.ft[1]
      if (home > away) {
        result = 1
      } else if (home < away) {
        result = 2
      } else {
        result = 0
      }
    }*/


    //peli datassa on ylimääräisiä pelejä joten hoidetaan että ne ei tulostu ja ei tulosteta alkamattomien pelien tuloksia
    /* if (away === null) {
       result = null
     }*/
    /*if (game.game.stage_name !== "First stage") {
      return
    }*/
    if (result == null) {
      result = '-'
    } else if (result == 0) {
      result = 'X'
    }

    return (
      <tr>
        <td className='taulu'>
          {game.game.name}
        </td>
        {data.persons.map(person =>
          <ShowPlayerResult key={person.id} player={person} gameId={game.game.id} gameResult={game.game.result} />
        )}
        <td className='taulu'>{result}</td>
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
        <h2>Paska peli</h2>

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
            <ShowGamesAndRows key={game.id} game={game} />
          )}
        </table>

      </div>
    )
  }




}

export default App
