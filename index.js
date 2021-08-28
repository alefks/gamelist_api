const express = require('express');
const app = express();

app.use(express.json());

const port = 3000;
const games = [];

// Função responsável por pegar games válidos:
const getValidGames = () => games.filter(Boolean)


// Função responsável por fazer o getById de filmes:
const getGameById = id => getValidGames().find(game => game.id === id)

// Função responsável por fazer o getByIndex de filmes:
const getGameIndexById = id => getValidGames().findIndex(game => game.id === id)

// GET - Home
app.get("/", (req, res) => {
    res.status(200).send({ hello: "Hello, guys!"});
})


// GET /games - GET ALL GAMES
app.get("/games", (req, res) => {
    res.json({ games });
});


// GET /games/id - get game by id
app.get("/games/:gameID", (req, res) => {
    const id = +req.params.gameID;
    const game = getGameById(id)
    !game
        ? res.status(404).send({error: "Game doesn't exist."})
        : res.json({ game });
});


// POST - /games - Create new game
app.post("/games", (req, res) => {
    const game = req.body;

    if (!game || !game.name || !game.imgLink) {
        res.status(400).send({ error: "Invalid game."})
        return;
    }

    const lastGame = games[games.length - 1];

    if (games.length) {
        game.id = lastGame.id + 1;
        games.push(game);
    } else {
        game.id = 1;
        games.push(game);
    }

    res.status(201).send({ game });
});


// PUT - /games/{id} - Change by ID
app.put("/games/:id", (req, res) => {
    const id = + req.params.id;

    // findIndex retorna a posição do objeto dentro do array (games), caso não exista retorna -1
    const gameIndex = getGameIndexById(id)

    // Validação para verificar se o filme existe no array
    if (gameIndex < 0) {
        res.status(404).send({error: "Game not found."})
        return;
    }


    // Pega o objeto JSON enviad no body da requisição
    const newGame = req.body;

    // Valida se todos os campos necessários foram enviados.
    if (!newGame || !newGame.name || !newGame.imgLink) {
        res.status(400).send({ error: "Invalid game."})
        return;
    }

    // Procura o filme cadastrado no meu array pelo ID passado no parâmetro, e insiro o objeto inteiro, dentro da const filme.
    const game = getGameById(id)
    newGame.id  = game.id

    games[gameIndex] = newGame;

    res.send({message: "Successfully CHANGED the game!"})
});

app.delete("/games/:id", (req, res) => {
    const id = +req.params.id;

    const gameIndex = getGameIndexById(id)

    if (gameIndex < 0) {
        res.status(404).send({error: "Game not found."})
        return;
    }

    games.splice(gameIndex, 1)
    res.send({message: "Successfully DELETED the game!"})
});



app.listen(port, () => {
    console.log("Rodando o server em: http://localhost:3000")
})