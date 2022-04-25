const _ = require('underscore');
const User = require('../../models/user');
const Match = require('../../models/match');

module.exports = {
    createMatch,
    getMatch,
    getAllMatches,
    playCard,
    joinMatch
};

let deckCards = [
    "JS1",
    "JH1",
    "JC1",
    "JD1",
    "JS2",
    "JH2",
    "JC2",
    "JD2",
    "2S1",
    "3S1",
    "4S1",
    "5S1",
    "6S1",
    "7S1",
    "8S1",
    "9S1",
    "6C1",
    "5C1",
    "4C1",
    "3C1",
    "2C1",
    "AH1",
    "KH1",
    "QH1",
    "10H1",
    "10S1",
    "7C1",
    "AS1",
    "2D1",
    "3D1",
    "4D1",
    "5D1",
    "6D1",
    "7D1",
    "9H1",
    "QS1",
    "8C1",
    "KS1",
    "6C2",
    "5C2",
    "4C2",
    "3C2",
    "2C2",
    "8D1",
    "8H1",
    "KS2",
    "9C1",
    "QS2",
    "7C2",
    "6H1",
    "5H1",
    "4H1",
    "AH2",
    "9D1",
    "7H1",
    "AS2",
    "10C1",
    "10S2",
    "8C2",
    "7H2",
    "2H1",
    "3H1",
    "KH2",
    "10D1",
    "6H2",
    "2D2",
    "QC1",
    "9S2",
    "9C2",
    "8H2",
    "9H2",
    "10H2",
    "QH2",
    "QD1",
    "5H2",
    "3D2",
    "KC1",
    "8S2",
    "10C2",
    "QC2",
    "KC2",
    "AC1",
    "AD1",
    "KD1",
    "4H2",
    "4D2",
    "AC2",
    "7S2",
    "6S2",
    "5S2",
    "4S2",
    "3S2",
    "2S2",
    "2H2",
    "3H2",
    "5D2",
    "AD2",
    "KD2",
    "QD2",
    "10D2",
    "9D2",
    "8D2",
    "7D2",
    "6D2"
];

let defaultBoard = [
    [
        {
            "card": "WILD",
            "chip": "w"
        },
        {
            "card": "2S1",
            "chip": "e"
        },
        {
            "card": "3S1",
            "chip": "e"
        },
        {
            "card": "4S1",
            "chip": "e"
        },
        {
            "card": "5S1",
            "chip": "e"
        },
        {
            "card": "6S1",
            "chip": "e"
        },
        {
            "card": "7S1",
            "chip": "e"
        },
        {
            "card": "8S1",
            "chip": "e"
        },
        {
            "card": "9S1",
            "chip": "e"
        },
        {
            "card": "WILD",
            "chip": "w"
        }
    ],
    [
        {
            "card": "6C1",
            "chip": "e"
        },
        {
            "card": "5C1",
            "chip": "e"
        },
        {
            "card": "4C1",
            "chip": "e"
        },
        {
            "card": "3C1",
            "chip": "e"
        },
        {
            "card": "2C1",
            "chip": "e"
        },
        {
            "card": "AH1",
            "chip": "e"
        },
        {
            "card": "KH1",
            "chip": "e"
        },
        {
            "card": "QH1",
            "chip": "e"
        },
        {
            "card": "10H1",
            "chip": "e"
        },
        {
            "card": "10S1",
            "chip": "e"
        }
    ],
    [
        {
            "card": "7C1",
            "chip": "e"
        },
        {
            "card": "AS1",
            "chip": "e"
        },
        {
            "card": "2D1",
            "chip": "e"
        },
        {
            "card": "3D1",
            "chip": "e"
        },
        {
            "card": "4D1",
            "chip": "e"
        },
        {
            "card": "5D1",
            "chip": "e"
        },
        {
            "card": "6D1",
            "chip": "e"
        },
        {
            "card": "7D1",
            "chip": "e"
        },
        {
            "card": "9H1",
            "chip": "e"
        },
        {
            "card": "QS1",
            "chip": "e"
        }
    ],
    [
        {
            "card": "8C1",
            "chip": "e"
        },
        {
            "card": "KS1",
            "chip": "e"
        },
        {
            "card": "6C2",
            "chip": "e"
        },
        {
            "card": "5C2",
            "chip": "e"
        },
        {
            "card": "4C2",
            "chip": "e"
        },
        {
            "card": "3C2",
            "chip": "e"
        },
        {
            "card": "2C2",
            "chip": "e"
        },
        {
            "card": "8D1",
            "chip": "e"
        },
        {
            "card": "8H1",
            "chip": "e"
        },
        {
            "card": "KS2",
            "chip": "e"
        }
    ],
    [
        {
            "card": "9C1",
            "chip": "e"
        },
        {
            "card": "QS2",
            "chip": "e"
        },
        {
            "card": "7C2",
            "chip": "e"
        },
        {
            "card": "6H1",
            "chip": "e"
        },
        {
            "card": "5H1",
            "chip": "e"
        },
        {
            "card": "4H1",
            "chip": "e"
        },
        {
            "card": "AH2",
            "chip": "e"
        },
        {
            "card": "9D1",
            "chip": "e"
        },
        {
            "card": "7H1",
            "chip": "e"
        },
        {
            "card": "AS2",
            "chip": "e"
        }
    ],
    [
        {
            "card": "10C1",
            "chip": "e"
        },
        {
            "card": "10S2",
            "chip": "e"
        },
        {
            "card": "8C2",
            "chip": "e"
        },
        {
            "card": "7H2",
            "chip": "e"
        },
        {
            "card": "2H1",
            "chip": "e"
        },
        {
            "card": "3H1",
            "chip": "e"
        },
        {
            "card": "KH2",
            "chip": "e"
        },
        {
            "card": "10D1",
            "chip": "e"
        },
        {
            "card": "6H2",
            "chip": "e"
        },
        {
            "card": "2D2",
            "chip": "e"
        }
    ],
    [
        {
            "card": "QC1",
            "chip": "e"
        },
        {
            "card": "9S2",
            "chip": "e"
        },
        {
            "card": "9C2",
            "chip": "e"
        },
        {
            "card": "8H2",
            "chip": "e"
        },
        {
            "card": "9H2",
            "chip": "e"
        },
        {
            "card": "10H2",
            "chip": "e"
        },
        {
            "card": "QH2",
            "chip": "e"
        },
        {
            "card": "QD1",
            "chip": "e"
        },
        {
            "card": "5H2",
            "chip": "e"
        },
        {
            "card": "3D2",
            "chip": "e"
        }
    ],
    [
        {
            "card": "KC1",
            "chip": "e"
        },
        {
            "card": "8S2",
            "chip": "e"
        },
        {
            "card": "10C2",
            "chip": "e"
        },
        {
            "card": "QC2",
            "chip": "e"
        },
        {
            "card": "KC2",
            "chip": "e"
        },
        {
            "card": "AC1",
            "chip": "e"
        },
        {
            "card": "AD1",
            "chip": "e"
        },
        {
            "card": "KD1",
            "chip": "e"
        },
        {
            "card": "4H2",
            "chip": "e"
        },
        {
            "card": "4D2",
            "chip": "e"
        }
    ],
    [
        {
            "card": "AC2",
            "chip": "e"
        },
        {
            "card": "7S2",
            "chip": "e"
        },
        {
            "card": "6S2",
            "chip": "e"
        },
        {
            "card": "5S2",
            "chip": "e"
        },
        {
            "card": "4S2",
            "chip": "e"
        },
        {
            "card": "3S2",
            "chip": "e"
        },
        {
            "card": "2S2",
            "chip": "e"
        },
        {
            "card": "2H2",
            "chip": "e"
        },
        {
            "card": "3H2",
            "chip": "e"
        },
        {
            "card": "5D2",
            "chip": "e"
        }
    ],
    [
        {
            "card": "WILD",
            "chip": "w"
        },
        {
            "card": "AD2",
            "chip": "e"
        },
        {
            "card": "KD2",
            "chip": "e"
        },
        {
            "card": "QD2",
            "chip": "e"
        },
        {
            "card": "10D2",
            "chip": "e"
        },
        {
            "card": "9D2",
            "chip": "e"
        },
        {
            "card": "8D2",
            "chip": "e"
        },
        {
            "card": "7D2",
            "chip": "e"
        },
        {
            "card": "6D2",
            "chip": "e"
        },
        {
            "card": "WILD",
            "chip": "w"
        }
    ]
]

function flipCoin() {
    let players = ["player_1","player_2"];
    let index = Math.floor(Math.random() * 2);
    return players[index];
}


function mapBoard(board) {

    //loops through the board rows
    return board.map( row => {

        //loops through the cards
       return row.map( card => {

           //return the chip
            return card.chip
        })
    })
}



async function createMatch(req, res) {
    console.log(req.body)
    try {
        //shuffle deck and add to match
        //    -- need to have all the cards on the backend
        //    -- write a function to shuffle the deck
        //    -- assign the shuffled cards to a variable

        let deck = deckCards;
        let currentIndex = deck.length,  randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [deck[currentIndex], deck[randomIndex]] = [
                deck[randomIndex], deck[currentIndex]];
        }
        // console.log(deck);

        //take the first 7 items of the deck array and assign to hand variable,
        //delete the first 7 cards of the deck
        let hand = deck.slice(0, 7);
        deck = deck.slice(7);


        //set default board object
        let params = {
            deck: deck,
            status: "waiting",
            board: defaultBoard,
            player_1:{
                user: req.body.userId,
                hand:hand,
                team: "r",
                score: 0
            }
        }
        //create match in mongo
        let match = await Match.create(params)
        //return match with user attached
        res.json(match);
    } catch {
        res.status(400).json('Bad Credentials');
    }
}

async function getMatch(req, res) {
    console.log(req.params);

    try {
        let match = await Match.findById(req.params.id)
            .populate('player_1.user')
            .populate('player_2.user');

        res.json(match);
    } catch {
        res.status(400).json('Bad Credentials');
    }
}

async function getAllMatches(req, res) {
    console.log(req.params);

    try {
        // re-sort based upon the sortOrder of the categories
        const matches = await Match.find().sort({'createdAt': -1})
            .populate('player_1.user')
            .populate('player_2.user');

        res.json(matches);
    } catch {
        res.status(400).json('Bad Credentials');
    }
}

async function playCard(req, res) {
    try {

        //set const from params
        const userId = req.userId;
        const card = req.card;
        console.log(req.body);

        //Query the match from mongo
        let match = await Match.findById(req.matchId)
            .populate('player_1.user')
            .populate('player_2.user');

        //Determine who's playing the card
        let player = userId === match.player_1.user._id.toString() ? 'player_1' : 'player_2';
        let opponent = player === "player_1" ? "player_2" : "player_1";
        console.log(player);

        //Match variables
        let board = match.board;
        let mappedBoard = mapBoard(board);
        let hand = match[player].hand;
        let deck = match.deck;

        console.log(hand);

        //Throw error if chip is already in this position
        if (board[card.y][card.x].chip !== 'e') {
            throw new Error("Chip is already in this spot")
        }

        //Throw error if card is not hand
        if (!hand.join().includes(`${card.value}${card.suit}`)) {
            throw new Error("This card is not in your hand :)")
        }

        //Place chip on the board
        board[card.y][card.x].chip = match[player].team;

//         let pattern = /(r{5,5})|(b{5,5})/;
//
// //Function to test against regex pattern
//         function testRows(board) {
//             return pattern.test(board);
//         }
//
// //Check for horizontal matches
//         let horizontal = _(mappedBoard)
//             .map((row) => row.join(""))
//             .join("e");
//         let horizontalTest = testRows(horizontal);
//
// //Check for vertical matches
//         let tansposedBoard = mappedBoard[0].map((_, colIndex) =>
//             mappedBoard.map((row) => row[colIndex])
//         );
//         let vertical = _(tansposedBoard)
//             .map((row) => row.join(""))
//             .join("e");
//         let verticalTest = testRows(vertical);
//
// // Check if there's any matches
//         console.log(horizontalTest || verticalTest ? "YOU WON" : "NO MATCH YET");


        //remove card from hand
        // hand = hand.filter(cardId => !cardId.includes(`${card.value}${card.suit}`));
        let removeCardIndex = hand.findIndex(cardId => cardId.includes(`${card.value}${card.suit}`));
        hand.splice(removeCardIndex, 1)


        //Add first card from the deck to the end of the hand
        let newCard = deck.slice(0,1)[0];
        hand.push(newCard);
        //Remove the first card from the deck
        deck = deck.slice(1);

        //save board, hand and deck to the database

        let changes = {
            board: board,
            [`${player}.hand`]: hand,
            deck: deck
        }

        match = await Match.findByIdAndUpdate( req.matchId , changes, { new: true })
            .populate('player_1.user')
            .populate('player_2.user');

        return match
    } catch(err) {
        return err.message
    }
}


async function joinMatch(req, res) {
    try {
        //set const from params
        const userId = req.userId;
        console.log(req.body);

        //Query the match from mongo
        let match = await Match.findById(req.matchId)
            .populate('player_1.user')
            .populate('player_2.user');

        //Match variables
        let deck = match.deck;

        //take the first 7 items of the deck array and assign to hand variable,
        //delete the first 7 cards of the deck
        let hand = deck.slice(0, 7);
        deck = deck.slice(7);

        //save board, hand and deck to the database
        let changes = {
            player_2:{
                user: userId,
                hand:hand,
                team: "b",
                score: 0
            },
            deck: deck
        }

        match = await Match.findByIdAndUpdate( req.matchId , changes, { new: true })
            .populate('player_1.user')
            .populate('player_2.user');

        res.json(match);
    } catch(err) {
        res.status(400).json(err.message);
    }
}


