import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import football from './assets/football.png'
import shirt from './assets/footballer-shirt.png'
import axios from 'axios'
import { useWeb3Context } from 'web3-react'
import { useContract } from './hooks'
import { position, team } from './constants'
import HowToPlay from './components/HowToPlay'
import './App.css'

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

async function generateRandomTeam() {
  
  var idsToMint = []
  var positionsToMint = []
  var res = await axios.get('/api/footballers/position/1')
  var gk = res.data
  res = await axios.get('/api/footballers/position/2')
  var def = res.data
  res = await axios.get('/api/footballers/position/3')
  var mid = res.data
  res = await axios.get('/api/footballers/position/4')
  var fwd = res.data

  for(var i = 0; i < 3; i++) {
    idsToMint.push(gk[Math.floor(Math.random() * gk.length + 1)].player_id)
    positionsToMint.push(1)
  }
  for(var j = 0; j < 4; j++) {
    idsToMint.push(def[Math.floor(Math.random() * def.length + 1)].player_id)
    positionsToMint.push(2)
    idsToMint.push(mid[Math.floor(Math.random() * mid.length + 1)].player_id)
    positionsToMint.push(3)
    idsToMint.push(fwd[Math.floor(Math.random() * fwd.length + 1)].player_id)
    positionsToMint.push(4)
  }
  return [idsToMint, positionsToMint]
}

// Mints a team to the caller.
async function buyPack(context, FPLCardContract) {
  const team = await generateRandomTeam()
  const amounts = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  try {
    await FPLCardContract.methods.mintTeam(context.account, team[0], team[1], amounts).send({ from: context.account, gasLimit: 6000000, value: 10000 })
    // await incrementMinted(res.data[0].id)
    console.log('mint successful')
  } catch (err) {
    console.log(err)
  }
}

function FootballerIcon(props) {
  return(
  <div class="col l3 m3 s6 selected-player-card">
  <span><strong>{props.footballer.second_name}</strong></span>
    <img src={shirt} alt="shirt" class="player-icon" />
    <span>{position(props.footballer.position)}</span>
    <span>{team(props.footballer.team)}</span>
  </div>
  )
}

async function incrementMinted(id) {
  await axios.put('api/footballers/' + id + '/minted')
}

async function resetMintedData() {
  try {
    await axios.put('/api/footballers/reset')
    console.log('footballer minted_count reset successful')
  } catch (err) {
    console.log(err)
  }
}

export function App() {
  const context = useWeb3Context()
  const FPLCardContract = useContract('FPLCards')
  const FPLContract = useContract('FPL')
  const [roster, setRoster] = useState([])
  const [games, setGames] = useState([])
  const [activeGames, setActiveGames] = useState([])
  const [currentGame, setCurrentGame] = useState({})
  
  const [gkSelection, setGkSelection] = useState(0)
  const [defSelection, setDefSelection] = useState(0)
  const [midSelection, setMidSelection] = useState(0)
  const [fwdSelection, setFwdSelection] = useState(0)
  const [teamSelection, setTeamSelection] = useState([])

  useEffect(() => {
    context.setConnector('Injected', true).catch(e => console.error('Error getting injected provider.', e))
  }, [context])

  if (!context.active && !context.error) {
    console.log('loading...')
    console.log(context)
  } else if (context.error) {
    console.log('error')
    console.log(context)
  } else {
    console.log('success')
    console.log(context)
  }

  async function fetchRoster(context, FPLCardContract) {
    var footballers = []
    var footballer
    const result = await FPLCardContract.methods.ownedTokens(context.account).call()
    for (var i = 0; i < result.length; i++) {
      footballer = await axios.get('/api/footballers/' + result[i].toNumber())
      footballers = [...footballers, footballer] 
    }
    setRoster(footballers);
  }

  async function fetchGames(context, contract) {
    var games = []
    var game
    var gameId
    const result = await contract.methods.viewRecentlyCreatedGames().call()
    const playerActiveGames = await contract.methods.viewActiveGames(context.account).call()
    const totalGames = await contract.methods.totalGames().call()
    for (var i = 0; i < totalGames.toNumber(); i++) {
      gameId = result[i].toNumber()
      game = await contract.methods.getGameDetails(gameId).call()
      games = [...games, game]
      games[i].id = gameId
    }
    setGames(games);
    setActiveGames(playerActiveGames)
  }

  async function createGame(context, contract, wager) {
    try {
      await contract.methods.createGame(wager).send({ from: context.account, gasLimit: 6000000, value: wager })
    } catch (err) {
      console.log(err)
    }
  }
  
  async function joinGame(context, contract, gameId) {
    try {
      await contract.methods.joinGame(gameId).send({ from: context.account, gasLimit: 600000, value: 10000 })
    } catch (err) {
      console.log(err)
    }
  }

  // Game Selector
function GameSelect(props) {
  const classes = useStyles()
  const [gameId, setGameId] = React.useState(0)

  function handleChange(e) {
    e.preventDefault()
    setGameId(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    submitTeam(context, FPLContract, FPLCardContract, teamSelection, gameId)
  }

  return (
    <div>
      <form className={classes.root} autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-simple">Game ID</InputLabel>
          <Select
            value={gameId}
            onChange={handleChange}>
            {props.games.map((game, index) => <MenuItem key={index} value={game.toNumber()}>{game.toNumber()}</MenuItem> )}
          </Select>
          <input class="btn" type="submit" />
        </FormControl>
      </form>
      <button class="btn" onClick={() => viewGame(context, FPLContract, gameId)}> View </button>
    </div>
  );
}

async function viewGame(FPLContract, gameId) {
  try {
    var game = await FPLContract.methods.getGameDetails(gameId).call()
  } catch (err) {
    console.log(err)
  }
  setCurrentGame(game)
}

  async function submitTeam(context, FPLContract, FPLCardContract, teamSelection, gameId) {
    var submittedTeam = []
    for (var i = 0; i < teamSelection.length; i++) {
      submittedTeam.push(teamSelection[i].id)
    }
    try {
      await FPLContract.methods.commitTeam(FPLCardContract.address, submittedTeam, gameId).send({ from: context.account, gasLimit: 6000000 })
    } catch (err) {
      console.log(err)
    }
  }

  function resetTeam() {
    setTeamSelection([])
  }

  function GameItem(props) {
    return(
      <li>
        <div class="game-item">
          id: #{props.game.id} {props.game.isOpen ? <p class="game-status">open</p> : <p class="game-status">in progress</p>}
          <hr></hr>
          {props.game.player1}
          {props.game.isOpen ? <button class="btn join-btn" onClick={() => joinGame(context, FPLContract, props.game.id).then(() => fetchGames(context, FPLContract))} > Join for {parseInt(props.game.wager)} wei</button> : <p>vs. {props.game.player2}</p>}
        </div>
      </li>
    )
  }

  function FootballerCard(props) {
    const [isChecked, setIsChecked] = useState(false)
    return(    
        // <FootballerCardInfo key={props.footballer.id} footballer={props.footballer[0]} />
        <div class="card">
          <div class="card-body-content">
            <p class="card-title">{props.footballer[0].first_name} {props.footballer[0].second_name}</p>
            <p>{position(props.footballer[0].position)}</p>
            <p>{team(props.footballer[0].team)}</p>
              {isChecked ? <p>Selected</p> : <button class="btn" onClick={() => mapSelection(props.footballer[0])}> Select </button>}
        </div>
      </div>
    )
  }

  function mapSelection(footballer) {
    switch (footballer.position) {
      case 1: 
        setGkSelection(footballer.id)
        break
      case 2: 
        setDefSelection(footballer.id)
        break
      case 3:
        setMidSelection(footballer.id)
        break
      default: 
        setFwdSelection(footballer.id)
        break
    }
    setTeamSelection(teamSelection => [...teamSelection, footballer])
  }

  console.log(currentGame)

  return (
    <div class="App">
      <header class="App-header">
        <p class="account">{context.account}</p> <br></br>
      </header>
      <div class="row how-to-play-container">
        <HowToPlay />
      </div>
      <div class="row logo-container">
        <img src={football} class="App-logo" alt="logo" />
        <h5 class="title" >Crypto Fantasy Premier League</h5>
      </div>
      <div class="row">
        <button class="btn" onClick={() => createGame(context, FPLContract, 10000).then(() => fetchGames(context, FPLContract))}> Create Game </button>
        <button class="btn" onClick={() => buyPack(context, FPLCardContract)}> Buy Pack </button>
        </div>
        <div class="row games-container-row">
          <div class="col s12 m6 l6">
            <h6>Recent Games</h6>
            <button class="btn" onClick={() => fetchGames(context, FPLContract)}> View Recent Games </button>
            <div class="row" >
             <ul>
              <div class="games-container" >
                {games.map((game, index) => (<GameItem key={index} game={game} />))}
              </div>
             </ul>
            </div>
          </div>
          <div class="col s12 m6 l6">
            <h6>Squad Selection</h6>
            <div class="row" >
              <div class="team-container" >
                <div class="row team-selection-row selected-player-container">
                {teamSelection.map((footballer, index) => (<FootballerIcon key={index} footballer={footballer} />))}
                </div>
              </div>
              <GameSelect games={activeGames} />
              <button class="btn" onClick={() => resetTeam()}> Reset </button>
            </div>
          </div>
        </div>
        <button class="btn" onClick={() => fetchRoster(context, FPLCardContract)}> View Available Players </button>
          <h4 class="card-container-title">My Roster</h4>
        <div class="row card-container">
         {roster.map((footballer, index) => (<FootballerCard key={index} index={index} footballer={footballer.data} />))}
        </div>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default App
