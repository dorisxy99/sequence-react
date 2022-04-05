const User = require('../../models/user');
const Match = require('../../models/match');

module.exports = {
    createMatch,
    getMatch,
    getAllMatches
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

function flipCoin() {
    let players = ["player_1","player_2"];
    let index = Math.floor(Math.random() * 2);
    return players[index];
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
        console.log(deck);

        //take the first 7 items of the deck array and assign to hand variable,
        //delete the first 7 cards of the deck
        let hand = deck.slice(0, 7);
        deck = deck.slice(7);

        //set default board object
        let params = {
            deck: deck,
            status: "waiting",
            player_1:{
                user: req.body.userId,
                hand:hand,
                team: "red",
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