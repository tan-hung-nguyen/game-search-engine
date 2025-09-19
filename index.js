import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const port = 3000;
const API_KEY = "c5e77d4cd24b4f3ab0aa3c8b4be342d6";
const config = { headers: { "x-api-key": API_KEY } };
const BASE_URL = "https://api.gamebrain.co/v1/games";
let gameData
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    //const defaultGames = await axios.get(`${BASE_URL}`, config);
    //gameData = defaultGames.data.results;
    const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
    let gameData = data.results;
    res.render('index.ejs', { defaultView: true, games: gameData});
});
app.get('/search', async (req, res) => {
    const query = req.query.query;
    try {
        //const response = await axios.get(`${BASE_URL}?query=${query}`, config);
        //gameData = response.data.results;
        res.render('index.ejs', { games: gameData, defaultView: false });
    } catch (error) {
        console.error(error); 
        res.status(500).send("An error occurred while fetching game data.");
    }
});

app.get('/game/:id/:name', async (req, res) => {
    const gameName = req.params.name;
    const gameId = req.params.id;
    try {
        //const response = await axios.get(`${BASE_URL}/${gameId}`, config);
        //const gameDetails = response.data;
        const data = JSON.parse(fs.readFileSync('./game-detail.json', 'utf8'));
        res.render('game.ejs', { game: data, gameName: gameName });
    } catch (error) {
        res.status(500).send("An error occurred while fetching game details.");
    }
});
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

