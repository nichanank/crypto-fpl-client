export default {
  'FPL': {
    address: '0x0cE3DD3e19eB253F6112B64DadB4263d138cCC54',
    ABI:
    [
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "recentlyCreatedGames",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x12eec019"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "leagueManager",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xbce1dd24"
      },
      {
        "inputs": [
          {
            "name": "_entryFee",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor",
        "signature": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "player1",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "wager",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "gameId",
            "type": "uint256"
          }
        ],
        "name": "LogGameCreation",
        "type": "event",
        "signature": "0x4312afb69a90bdbc921f5d67a7f007d55d959082541229557a6575b890838057"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "player2",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "gameId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "totalPayout",
            "type": "uint256"
          }
        ],
        "name": "LogGameBegin",
        "type": "event",
        "signature": "0xc128984de6e48bf6fb89ce9269cf1b8b5726f0f84b60d59b55689025378418d0"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "player1",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "gameId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "gkHash",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "defHash",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "midHash",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "fwdHash",
            "type": "bytes32"
          }
        ],
        "name": "LogPlayer1TeamCommit",
        "type": "event",
        "signature": "0x5d0847c2e0be4a0b2d7891f71f4f38782e1240a49b09b55feb71aa82608f06fc"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "player2",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "gameId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "gkHash",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "defHash",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "midHash",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "fwdHash",
            "type": "bytes32"
          }
        ],
        "name": "LogPlayer2TeamCommit",
        "type": "event",
        "signature": "0x2da462c05cf06248c04502173e1a2b68e4c165358bcd93b79438582f179cc90b"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "sender",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "revealHash",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "random",
            "type": "uint256"
          }
        ],
        "name": "LogRevealTeam",
        "type": "event",
        "signature": "0x7ecbedad1328cc035a6f4d1ddf54bfa5fc029a987b80407f63d11319be0b2db8"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "winner",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "winningScore",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "losingScore",
            "type": "uint256"
          }
        ],
        "name": "LogGameEnd",
        "type": "event",
        "signature": "0x8be419af6f5a26ab8a7e0ff98b46af5cbf547d86503ac862e914e4573cae4fc4"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "winner",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "balance",
            "type": "uint256"
          }
        ],
        "name": "LogPayoutSent",
        "type": "event",
        "signature": "0x598b937c5ae870243cb17b7777f106fb0688cf08cdcee299bf32badb25c62a6e"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "gameId",
            "type": "uint256"
          }
        ],
        "name": "getGameDetails",
        "outputs": [
          {
            "name": "player1",
            "type": "address"
          },
          {
            "name": "player2",
            "type": "address"
          },
          {
            "name": "wager",
            "type": "uint256"
          },
          {
            "name": "isOpen",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x1b31abda"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "wager",
            "type": "uint256"
          }
        ],
        "name": "createGame",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": true,
        "stateMutability": "payable",
        "type": "function",
        "signature": "0x48e837b9"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "gameId",
            "type": "uint256"
          }
        ],
        "name": "joinGame",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function",
        "signature": "0xefaa55a0"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "viewRecentlyCreatedGames",
        "outputs": [
          {
            "name": "latestGames",
            "type": "uint256[10]"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x36dbe5d3"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "totalGames",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x2c4e591b"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "player",
            "type": "address"
          }
        ],
        "name": "viewActiveGames",
        "outputs": [
          {
            "name": "gameIds",
            "type": "uint256[3]"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x22dafa75"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "cardContractAddr",
            "type": "address"
          },
          {
            "name": "tokenIds",
            "type": "uint256[]"
          },
          {
            "name": "gameId",
            "type": "uint256"
          }
        ],
        "name": "commitTeam",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x70483783"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "data",
            "type": "bytes32"
          }
        ],
        "name": "getHash",
        "outputs": [
          {
            "name": "",
            "type": "bytes32"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x3cf5040a"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "data",
            "type": "bytes32"
          },
          {
            "name": "salt",
            "type": "bytes32"
          }
        ],
        "name": "getSaltedHash",
        "outputs": [
          {
            "name": "",
            "type": "bytes32"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x8dddbf36"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "gameId",
            "type": "uint256"
          }
        ],
        "name": "getGKCommitForGame",
        "outputs": [
          {
            "name": "",
            "type": "bytes32"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xc9e3cfe9"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "gameId",
            "type": "uint256"
          }
        ],
        "name": "withdrawPayout",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xb21c7935"
      }
    ],
  },
  'FPLCards': {
    address: '0x4908f98A17514e43762A476Dfb5128a4F09a04E8',
    ABI: 
    [
      {
        "constant": true,
        "inputs": [
          {
            "name": "_owner",
            "type": "address"
          },
          {
            "name": "_id",
            "type": "uint256"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x00fdd58e"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_interfaceID",
            "type": "bytes4"
          }
        ],
        "name": "supportsInterface",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x01ffc9a7"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_id",
            "type": "uint256"
          }
        ],
        "name": "uri",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x0e89341c"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_myid",
            "type": "bytes32"
          },
          {
            "name": "_result",
            "type": "string"
          }
        ],
        "name": "__callback",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x27dc297e"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_from",
            "type": "address"
          },
          {
            "name": "_to",
            "type": "address"
          },
          {
            "name": "_ids",
            "type": "uint256[]"
          },
          {
            "name": "_amounts",
            "type": "uint256[]"
          },
          {
            "name": "_data",
            "type": "bytes"
          }
        ],
        "name": "safeBatchTransferFrom",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x2eb2c2d6"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_myid",
            "type": "bytes32"
          },
          {
            "name": "_result",
            "type": "string"
          },
          {
            "name": "_proof",
            "type": "bytes"
          }
        ],
        "name": "__callback",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x38bbfa50"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_owners",
            "type": "address[]"
          },
          {
            "name": "_ids",
            "type": "uint256[]"
          }
        ],
        "name": "balanceOfBatch",
        "outputs": [
          {
            "name": "",
            "type": "uint256[]"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x4e1273f4"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "ratings",
        "outputs": [
          {
            "name": "",
            "type": "uint8"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x5d30e84d"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x715018a6"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x8da5cb5b"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "isOwner",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x8f32d59b"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "positions",
        "outputs": [
          {
            "name": "",
            "type": "uint8"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x99fbab88"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_operator",
            "type": "address"
          },
          {
            "name": "_approved",
            "type": "bool"
          }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xa22cb465"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "ownedTokens",
        "outputs": [
          {
            "name": "",
            "type": "uint256[]"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xb12ab40f"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "season",
        "outputs": [
          {
            "name": "",
            "type": "uint32"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xc50b0fb0"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_owner",
            "type": "address"
          },
          {
            "name": "_operator",
            "type": "address"
          }
        ],
        "name": "isApprovedForAll",
        "outputs": [
          {
            "name": "isOperator",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xe985e9c5"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_from",
            "type": "address"
          },
          {
            "name": "_to",
            "type": "address"
          },
          {
            "name": "_id",
            "type": "uint256"
          },
          {
            "name": "_amount",
            "type": "uint256"
          },
          {
            "name": "_data",
            "type": "bytes"
          }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xf242432a"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xf2fde38b"
      },
      {
        "inputs": [
          {
            "name": "_season",
            "type": "uint32"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor",
        "signature": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "ids",
            "type": "uint256[]"
          },
          {
            "indexed": false,
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "LogTeamMinted",
        "type": "event",
        "signature": "0x596b94174caec1e7e9afd41a8fa987600e917bf5a6870d761428c709e80f1a2b"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "_uri",
            "type": "string"
          },
          {
            "indexed": true,
            "name": "_id",
            "type": "uint256"
          }
        ],
        "name": "URI",
        "type": "event",
        "signature": "0x6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "_operator",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "_from",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "_to",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "_id",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "_amount",
            "type": "uint256"
          }
        ],
        "name": "TransferSingle",
        "type": "event",
        "signature": "0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "_operator",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "_from",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "_to",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "_ids",
            "type": "uint256[]"
          },
          {
            "indexed": false,
            "name": "_amounts",
            "type": "uint256[]"
          }
        ],
        "name": "TransferBatch",
        "type": "event",
        "signature": "0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "_owner",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "_operator",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "_approved",
            "type": "bool"
          }
        ],
        "name": "ApprovalForAll",
        "type": "event",
        "signature": "0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "previousOwner",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event",
        "signature": "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "pure",
        "type": "function",
        "signature": "0x06fdde03"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "pure",
        "type": "function",
        "signature": "0x95d89b41"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_owner",
            "type": "address"
          },
          {
            "name": "ids",
            "type": "uint256[]"
          },
          {
            "name": "playerPositions",
            "type": "uint256[]"
          },
          {
            "name": "amounts",
            "type": "uint256[]"
          }
        ],
        "name": "mintTeam",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function",
        "signature": "0x1dd69f71"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "positionOf",
        "outputs": [
          {
            "name": "",
            "type": "uint8"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x46f96023"
      }
    ],
  }
}