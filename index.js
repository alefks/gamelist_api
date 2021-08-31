const express = require("express");
const gameSchema = require("./models/game");
const mongoose = require("./database");
require("dotenv").config();

const app = express();
app.use(express.json());

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;

const port = process.env.PORT || 3000;
const connectionString = `mongodb://${dbHost}:${dbPort}/${dbName}`;


// GET - Home
app.get("/", (req, res) => {
  res.send({ info: "Hello, guys!" });
});

// GET /games - GET ALL GAMES
app.get("/games", async (req, res) => {
  const games = await gameSchema.find();
  res.send({ games });
});

// GET /games/:id - get a movie BY ID
app.get("/games/:id", async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(422).send({ error: "Invalid ID" });
    return;
  }

  const game = await gameSchema.findById(id);

  if (!game) {
    res.status(404).send({ error: "Game not found" });
    return;
  }

  res.send({ game });
});

// POST - Create a new game
app.post("/games", async (req, res) => {
  const game = req.body;

  if (!game || !game.name || !game.genre) {
    res.status(400).send({ error: "Invalid game." });
    return;
  }

  const newGame = await new gameSchema(game).save();

  res.status(201).send({ info: "Succesfully created the game." });
});

// PUT - /games/:id - UPDATE a game
app.put("/games/:id", async (req, res) => {
  const id = req.params.id;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(422).send({ error: "Invalid ID" });
    return;
  }

  const game = await gameSchema.findById(id);

  if (!game) {
    res.status(404).send({ error: "Game not found" });
    return;
  }

  const newGame = req.body;

  if (!game || !game.name || !game.genre) {
    res.status(400).send({ error: "Invalid game." });
    return;
  }

  await gameSchema.findOneAndUpdate({ _id: id }, newGame);
  const updateGame = await gameSchema.findById(id);

  res.send({ info: "Succesfully updated the game." });
});

// DELETE - /games/:id
app.delete("/games/:id", async (req, res) => {
  const id = req.params.id;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(422).send({ error: "Invalid ID" });
    return;
  }

  const game = await gameSchema.findById(id);

  if (!game) {
    res.status(404).send({ error: "Game not found" });
    return;
  }

  await gameSchema.findByIdAndRemove(id);
  res.send({ message: "Succesfully removed the game." });
});

app.listen(port, () => {
  console.log(`Rodando o server em: http://${dbHost}:${port}`);
});
