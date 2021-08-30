const express = require('express');
const gameSchema = require('./models/game');
const mongoose = require("./database");
const { exists } = require('./models/game');

const app = express();
const port = 3000;
app.use(express.json());


// GET - Home
app.get("/", (req, res) => {
    res.send({ info: "Hello, guys!"});
})


// GET /games - GET ALL GAMES
app.get('/games', async (req, res) => {
    const games = await gameSchema.find();
    res.send({games});
})

// GET /games/:id - get a movie ById
app.get('/games/:id', async (req, res) => {
    const id = req.params.id;

    if( !mongoose.Types.ObjectId.isValid(id) ) {
        res.status(422).send({error: 'Invalid ID'})
        return;
    }

    const game = await gameSchema.findById(id);

    if(!filme){
        res.status(404).send({error: 'Game not found'})
        return;
    }

    res.send({game});

})





app.listen(port, () => {
    console.log(`Rodando o server em: http://localhost:${port}`)
})