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
import { sha3, numberToHex, toWei } from 'web3-utils'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { convertEpochToDatetime } from './utils'
import InjectedConnector from './InjectedConnector'

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

async function calculateTotalScore(players) {
  var totalScore = 0
  var res
  var playerScores
  for (var i = 0; i < players.length; i++) {
    res = await axios.get('/api/scores/' + players[i])
    playerScores = res.data[0]
    totalScore += playerScores.gw1_score
  }
  return totalScore
}

// Mints a team to the caller.
async function buyPack(context, FPLCardContract) {
  const team = await generateRandomTeam()
  const amounts = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  try {
    const callMethod = FPLCardContract.methods.mintTeam(context.account, team[0], team[1], amounts)
    await callMethod.send({ from: context.account, value: 10000 }, function(err, transactionHash) {
      if (err) {
        console.log(err)
      } else {
        alert('success! click VIEW MY ROSTER to see your team')
      }
    }) 
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

export function App() {
  const context = useWeb3Context()
  const FPLCardContract = useContract('FPLCards')
  const FPLContract = useContract('FPL')
  const [transactionHash, setTransactionHash] = useState();
  const [currentGameweek, setCurrentGameweek] = useState({})

  const [roster, setRoster] = useState([])
  const [games, setGames] = useState([])
  const [activeGames, setActiveGames] = useState([])
  const [currentGame, setCurrentGame] = useState({})
  const [currentGameId, setCurrentGameId] = useState({})
  const [currentGameCommit, setCurrentGameCommit] = useState([])
  const [currentGameCommitOpponent, setCurrentGameCommitOpponent] = useState([])
  
  const [gkSelection, setGkSelection] = useState(0)
  const [defSelection, setDefSelection] = useState(0)
  const [midSelection, setMidSelection] = useState(0)
  const [fwdSelection, setFwdSelection] = useState(0)

  const [gkReveal, setGkReveal] = useState(0)
  const [defReveal, setDefReveal] = useState(0)
  const [midReveal, setMidReveal] = useState(0)
  const [fwdReveal, setFwdReveal] = useState(0)
  const [totalScore, setTotalScore] = useState(0)
  const [scoreCalculated, setScoreCalculated] = useState(false)

  const [salt, setSalt] = useState(0)
  const [teamSelection, setTeamSelection] = useState([])

  const classes = useStyles()

  function handleChange(e) {
    e.preventDefault()
    viewGame(context, FPLContract, e.target.value)
    setCurrentGame(e.target.value)
    setCurrentGameId(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    commitTeam(context, FPLContract, currentGameId, salt)
  }

  function handleInput(e) {
    let update = {}
    update[e.target.name] = e.target.value
    if(update['salt']){
      update.salt = e.target.value
    }
    setSalt(update.salt)
  }

  function handleBuy(e) {
    e.preventDefault()
    buyPack(context, FPLCardContract)
  }

  function handleCalculateScore(e) {
    e.preventDefault()
    calculateTotalScore([gkSelection, defSelection, midSelection, fwdSelection])
      .then((score) => setTotalScore(score))
      .then(() => setScoreCalculated(true))
  }

  useEffect(() => {
    context.setConnector('Injected', true).catch(e => console.error('Error getting injected provider.', e))
    setSalt(Math.floor(Math.random() * 100))
  }, [context.account, context])

  useEffect(() => {
    async function fetchCurrentGameweek() {
      const res = await axios.get('/api/gameweeks/live/1')
      setCurrentGameweek(res.data)
    };
    fetchCurrentGameweek()
  }, []);

  if (!context.active && !context.error) {
    console.log('loading...')
    console.log(context)
  } else if (context.error) {
    console.log('error')
    console.log(context)
  } else {
    console.log('success')
    console.log(context)
    console.log(FPLContract.methods)
  }

  async function fetchRoster(context, FPLCardContract) {
    var footballers = []
    var footballer
    const callMethod = FPLCardContract.methods.ownedTokens(context.account)
    const result = await callMethod.call({from: context.account})
    for (var i = 0; i < result.length; i++) {
      footballer = await axios.get('/api/footballers/' + result[i].toNumber())
      footballers = [...footballers, footballer] 
    }
    setRoster(footballers)
  }

  async function fetchGames(contract) {
    var games = []
    var game
    var gameId
    var callMethod = contract.methods.viewRecentlyCreatedGames()
    const result = await callMethod.call({from: context.account})
    const playerActiveGames = await contract.methods.viewActiveGames().call({from: context.account})
    const totalGames = await contract.methods.totalGames().call({from: context.account})
    if (totalGames.toNumber() < 10) {
      for (var i = 0; i < totalGames.toNumber(); i++) {
        gameId = result[i].toNumber()
        game = await contract.methods.getGameDetails(gameId).call()
        games = [...games, game]
        games[i].id = gameId
      }
    } else {
      for (var j = 0; j < result.length; j++) {
        gameId = result[i].toNumber()
        game = await contract.methods.getGameDetails(gameId).call()
        games = [...games, game]
        games[i].id = gameId
      }
    }
    setGames(games)
    setActiveGames(playerActiveGames)
  }

  async function createGame(context, contract, wager) {    
    try {
      const callMethod = contract.methods.createGame(wager)
      await callMethod.send({ from: context.account, value: wager }, function(err, transactionHash) {
        if (err) { 
            console.log(err); 
            alert(err)
        } else {
            alert("Game created! TxHash: " + transactionHash)
            console.log(transactionHash);
        }
      })
    } catch (err) {
      console.log(err)
      alert(err)
    }
  }
  
  async function joinGame(context, contract, gameId) {
    try {
      const callMethod = contract.methods.joinGame(gameId)
      await callMethod.send({ from: context.account, value: 10000 }, function(err, transactionHash) {
        if (err) { 
            console.log(err); 
        } else {
            alert("Joined game " + gameId + "! TxHash: " + transactionHash)
            console.log(transactionHash);
        }
      })
    } catch (err) {
      console.log(err)
      alert(err)
    }
  }

async function viewGame(context, FPLContract, gameId) {
  try {
    var game = await FPLContract.methods.getGameDetails(gameId).call()
    var gameCommit = await FPLContract.methods.getTeamCommitForGame(gameId, context.account).call()
    var gameCommitOpponent
    if (context.account === game.player1) {
      gameCommitOpponent = await FPLContract.methods.getTeamCommitForGame(gameId, game.player2).call()
    } else {
      gameCommitOpponent = await FPLContract.methods.getTeamCommitForGame(gameId, game.player1).call()
    }
  } catch (err) {
    console.log(err)
    alert(err)
  }
  setCurrentGame(game)
  setCurrentGameId(gameId)
  setCurrentGameCommit(gameCommit)
  setCurrentGameCommitOpponent(gameCommitOpponent)
}

  async function commitTeam(context, FPLContract, gameId) {
    var teamHash = {}
    teamHash['gk'] = await FPLContract.methods.getSaltedHash(numberToHex(gkReveal), numberToHex(salt)).call()
    teamHash['def'] = await FPLContract.methods.getSaltedHash(numberToHex(defReveal), numberToHex(salt)).call()
    teamHash['mid'] = await FPLContract.methods.getSaltedHash(numberToHex(midReveal), numberToHex(salt)).call()
    teamHash['fwd'] = await FPLContract.methods.getSaltedHash(numberToHex(fwdReveal), numberToHex(salt)).call()
    try {
      const callMethod = FPLContract.methods.commitTeam(teamHash['gk'], teamHash['def'], teamHash['mid'], teamHash['fwd'], gameId)
      await callMethod.send({ from: context.account }, function(err, transactionHash) {
        if (err) {
          console.log(err)
        } else {
          alert('Team committed! Remember to take note of your salt (' + salt + ') and team selection. You will have to resubmit these when revealing your team.')
        }
      })
    } catch (err) {
      console.log(err)
      alert(err)
    }
  }

  async function revealTeam(context, FPLContract, gameId) {
    try {
      const callMethod = FPLContract.methods.revealTeam(sha3(numberToHex(gkSelection)), sha3(numberToHex(defSelection)), sha3(numberToHex(midSelection)), sha3(numberToHex(fwdSelection)), gameId, numberToHex(salt), totalScore)
      await callMethod.send({ from: context.account }, function(err, transactionHash) {
        if (err) {
          console.log(err)
        } else {
          alert("Successful team reveal!")
        }
      })
    } catch (err) {
      console.log(err)
      alert(err)
    }
  }

  function resetTeam() {
    setTeamSelection([])
    setGkSelection(0)
    setDefSelection(0)
    setMidSelection(0)
    setFwdSelection(0)
  }

  function GameItem(props) {
    return(
      <li>
        <div class="game-item">
          id: #{props.game.id} {props.game.isOpen ? <p class="game-status">open</p> : <p class="game-status">in progress</p>}
          <hr></hr>
          {props.game.player1}
          {props.game.isOpen ? <button class="btn join-btn" onClick={() => joinGame(context, FPLContract, props.game.id)} > Join for {parseInt(props.game.wager)} wei</button> : <p>vs. {props.game.player2}</p>}
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

  async function mapSelection(footballer) {
    switch (footballer.position) {
      case 1: 
        setGkSelection(footballer.player_id)
        setGkReveal(sha3(numberToHex(footballer.player_id)))
        break
      case 2: 
        setDefSelection(footballer.player_id)
        setDefReveal(sha3(numberToHex(footballer.player_id)))
        break
      case 3:
        setMidSelection(footballer.player_id)
        setMidReveal(sha3(numberToHex(footballer.player_id)))
        break
      default: 
        setFwdSelection(footballer.player_id)
        setFwdReveal(sha3(numberToHex(footballer.player_id)))
        break
    }
    setTeamSelection([...teamSelection, footballer])
  }

  return (
    <div class="App">
      <header class="App-header">
        <p class="account">{context.account}</p> <br></br>
      </header>
      <div class="row how-to-play-container">
        <div class="col s6 m6 l6 gameweek-info-column">
          {currentGameweek[0] ? <p><strong>Current Gameweek:</strong> {currentGameweek[0].id}<br></br><strong>Deadline:</strong> {convertEpochToDatetime(currentGameweek[0].deadline_time_epoch).toLocaleString()}</p> : <p>Fetching gameweek data... </p>}
        </div>
        <HowToPlay />
      </div>
      <div class="row logo-container">
        <img src={football} class="App-logo" alt="logo" />
        <h5 class="title" >Crypto Fantasy Premier League</h5>
      </div>
      <div class="row">
        <button class="btn" onClick={(e) => handleBuy(e)}> Buy Pack </button>
        </div>
        <div class="row games-container-row">
          <div class="col s12 m6 l6">
            <h6><strong>🎮 Head-to-Head Games 🎮 </strong></h6>
              <button class="btn" value="createGame" name="createGame" onClick={() => createGame(context, FPLContract, 10000)}> Create Game </button>
              <button class="btn" onClick={() => fetchGames(FPLContract)}> View Recent Games </button>
            <div class="row" >
             <ul>
              <div class="games-container" >
                {games.map((game, index) => (<GameItem key={index} game={game} />))}
              </div>
             </ul>
            </div>
          </div>
          <div class="col s12 m6 l6">
            <h6><strong>👟 Squad Selection 👟</strong></h6>
            <div class="row squad-column" >
              <div class="team-container" >
                <div class="row team-selection-row selected-player-container">
                  <div class="col s6 m6 l6">
                    <p>Salt </p>
                    <input
                      style={{verticalAlign:"middle",width:100,margin:6,maxHeight:20,padding:5,border:'2px solid #ccc',borderRadius:5}}
                      type="text" name="salt" value={salt} onChange={(e) => handleInput(e)} />
                  </div>
                  <div class="col s6 m6 l6">
                    <form className={classes.root} autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-simple">Game ID</InputLabel>
                        <Select
                          value={currentGameId}
                          onChange={handleChange}>
                          {activeGames.map((game, index) => <MenuItem key={index} value={game.toNumber()}>{game.toNumber()}</MenuItem> )}
                        </Select>
                        <input class="btn" value="Submit Team" type="submit" />
                      </FormControl>
                    </form>
                  </div>
                  {Object.entries(teamSelection).map(([key, value]) => (<FootballerIcon key={key} footballer={value} />))}
                </div>
              </div>
              <div><br></br><hr></hr>
                <div class="game-info-container">
                  {currentGame.player1 ? <p> <strong>Current Game ID #{currentGameId}</strong> <br></br> Player 1: {currentGame.player1} <br></br> Player 2: {currentGame.player2} <br></br> <strong>YOUR TEAM</strong> <br></br> GK: {currentGameCommit[0]} <br></br> DEF: {currentGameCommit[1]} <br></br> MID: {currentGameCommit[2]} <br></br> FWD: {currentGameCommit[3]} <br></br> <strong>OPPONENT'S TEAM</strong> <br></br> GK: {currentGameCommitOpponent[0]} <br></br> DEF: {currentGameCommitOpponent[1]} <br></br> MID: {currentGameCommitOpponent[2]} <br></br> FWD: {currentGameCommitOpponent[3]} <br></br><strong>YOUR SCORE: {totalScore}</strong></p> 
                  : <p> Select an active game from the dropdown menu or join an open game </p>}
                </div>
                {scoreCalculated ? <button class="btn" onClick={() => revealTeam(context, FPLContract, currentGameId)}> Reveal </button> :
                <button class="btn" onClick={(e) => handleCalculateScore(e)}> Calculate Score </button>}                
              </div>
              <button class="btn" onClick={() => resetTeam()}> Reset Team Selection </button>
            </div>
          </div>
        </div>
        <button class="btn" onClick={() => fetchRoster(context, FPLCardContract)}> View My Roster </button>
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
