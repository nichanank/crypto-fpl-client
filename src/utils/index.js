import Web3 from 'web3'
import axios from 'axios'
import contracts from '../contracts'

export function getContract(library, contractName) {
  const web3 = new Web3(library.givenProvider || "http://127.0.0.1:7545")
  if (contractName === 'FPLCards') {
    return new web3.eth.Contract(contracts.FPLCards.ABI, contracts.FPLCards.address)
  } else {
    return new web3.eth.Contract(contracts.FPL.ABI, contracts.FPL.address)
  }
}

export function getContractAddress(contractName) {
  return contracts[contractName].address
}

export function convertEpochToDatetime(epoch) {
  return new Date(epoch * 1000)
}

export async function calculatePlayerScore(teamSelection) {
  var totalScore = 0
  var res
  var playerScores
  for (var i = 0; i < teamSelection.length; i++) {
    res = await axios.get('/api/scores/' + teamSelection[i])
    playerScores = res.data[0]
    totalScore += playerScores.gw1_score
  }
  return totalScore
}

export async function generateRandomTeam() {
  var idsToMint = []
  var positionsToMint = []
  var gk = await axios.get('/api/footballers/position/1')
  var def = await axios.get('/api/footballers/position/2')
  var mid = await axios.get('/api/footballers/position/3')
  var fwd = await axios.get('/api/footballers/position/4')

  for(var i = 0; i < 3; i++) {
    idsToMint.push(gk.data[Math.floor(Math.random() * gk.data.length + 1)].player_id)
    positionsToMint.push(1)
  }
  for(var j = 0; j < 4; j++) {
    idsToMint.push(def.data[Math.floor(Math.random() * def.data.length + 1)].player_id)
    positionsToMint.push(2)
    idsToMint.push(mid.data[Math.floor(Math.random() * mid.data.length + 1)].player_id)
    positionsToMint.push(3)
    idsToMint.push(fwd.data[Math.floor(Math.random() * fwd.data.length + 1)].player_id)
    positionsToMint.push(4)
  }
  return [idsToMint, positionsToMint]
}

export async function fetchGames(context, contract) {
    var games = []
    var game
    var gameId
    var gamesToShow
    const result = await contract.methods.viewRecentlyCreatedGames().call({from: context.account})
    const playerActiveGames = await contract.methods.viewActiveGames().call({from: context.account})
    const totalGames = await contract.methods.totalGames().call({from: context.account})
    if (totalGames.toNumber() < 10) { gamesToShow = totalGames.toNumber() } else {gamesToShow = result.length}
    for (var i = 0; i < gamesToShow; i++) {
        gameId = result[i].toNumber()
        game = await contract.methods.viewGameDetails(gameId).call()
        games = [...games, game]
        games[i].id = gameId
      }
    return {games: games, activeGames: playerActiveGames}
  }

export async function fetchRoster(context, FPLCardContract) {
  var footballers = []
  var footballer
  const callMethod = FPLCardContract.methods.ownedTokens(context.account)
  const result = await callMethod.call({from: context.account})
  for (var i = 0; i < result.length; i++) {
    footballer = await axios.get('/api/footballers/' + result[i].toNumber())
    footballers = [...footballers, footballer] 
  }
  return footballers
}

export async function viewGame(context, FPLContract, gameId) {
    try {
      var game = await FPLContract.methods.viewGameDetails(gameId).call()
      var gameCommit = await FPLContract.methods.getTeamCommitForGame(gameId, context.account).call()
      var scoreBN
      var opponentScoreBN
      var gameCommitOpponent
      var opRevealed = false
      var playerRevealed = false
      var opponentScore = 0
      var score = 0
      var winner = ''
      if (context.account === game.player1) {
        playerRevealed = await FPLContract.methods.teamRevealed(gameId, game.player1).call()
        gameCommitOpponent = await FPLContract.methods.getTeamCommitForGame(gameId, game.player2).call()
        opRevealed = await FPLContract.methods.teamRevealed(gameId, game.player2).call()
        if (playerRevealed) {
          scoreBN = await FPLContract.methods.viewPlayerScore(gameId, game.player2).call()
          score = scoreBN.toNumber()
        }
        if (opRevealed) {
          opponentScoreBN = await FPLContract.methods.viewPlayerScore(gameId, game.player1).call()
          opponentScore = opponentScoreBN.toNumber()
        }
      } else {
        playerRevealed = await FPLContract.methods.teamRevealed(gameId, game.player2).call()
        gameCommitOpponent = await FPLContract.methods.getTeamCommitForGame(gameId, game.player1).call()
        opRevealed = await FPLContract.methods.teamRevealed(gameId, game.player1).call()
        if (playerRevealed) {
          scoreBN = await FPLContract.methods.viewPlayerScore(gameId, game.player2).call()
          score = scoreBN.toNumber()
        }
        if (opRevealed) {
          opponentScoreBN = await FPLContract.methods.viewPlayerScore(gameId, game.player1).call()
          opponentScore = opponentScoreBN.toNumber()
        }
      }
      if (playerRevealed && opRevealed) {
        winner = await FPLContract.methods.viewWinner(gameId).call()
      }
    } catch (err) {
      console.log(err)
      alert(err)
    }
    return {
      game: game,
      gameId: gameId,
      gameCommit: gameCommit,
      gameCommitOpponent: gameCommitOpponent,
      playerRevealed: playerRevealed,
      opRevealed: opRevealed,
      score: score,
      opponentScore: opponentScore,
      winner: winner
    }
  }