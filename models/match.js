const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref:'User'},
  score: {type: Number, default: 0},
  hand: {type: Array, default: []},
  team: String
}, {
  _id : false
});


const matchSchema = new Schema({
  board: {type: Array, default: []},
  turn: String,
  status: String, //waiting, matched, ended
  deck: {type: Array, default: []},
  player_1: { type: playerSchema },
  player_2: { type: playerSchema },

}, {
  timestamps: true
});


module.exports = mongoose.model('Match', matchSchema);