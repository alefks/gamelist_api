const mongoose = require('../database/index')

const gameSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    genre:{
        type: String,
        require: true
    }
});

const game = mongoose.model("game", gameSchema);

module.exports = game;