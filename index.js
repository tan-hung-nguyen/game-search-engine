// Import required modules
import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import fs from 'fs';
// Initialize Express app
const app = express();
const port = 3000;

// API configuration
const API_KEY = "c5e77d4cd24b4f3ab0aa3c8b4be342d6";
const config = { headers: { "x-api-key": API_KEY } };
const BASE_URL = "https://api.gamebrain.co/v1/games";

// Serve static files from the 'public' directory
app.use(express.static('public'));
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Home route
 * - Fetches a list of top-rated games from the external API.
 * - Renders the index.ejs view with the games data.
 */
app.get('/', async (req, res) => {
    const defaultGames = await axios.get(`${BASE_URL}?sort=computed_rating&sort-order=desc`, config);
    let gameData = defaultGames.data.results;
    //const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
    //let gameData = data.results;
    res.render('index.ejs', { defaultView: true, games: gameData});
});

/**
 * Search route
 * - Searches for games based on the user's query.
 * - Renders the index.ejs view with the search results.
 */
app.get('/search', async (req, res) => {
    const query = req.query.query;
    try {
        const response = await axios.get(`${BASE_URL}?query=${query}`, config);
        let gameData = response.data.results;
        res.render('index.ejs', { games: gameData, defaultView: false });
    } catch (error) {
        console.error(error); 
        res.status(500).send(error.response.data.message);
    }
});

/**
 * Game detail route
 * - Fetches detailed information for a specific game by ID.
 * - Renders the game.ejs view with the game details.
 */
app.get('/game/:id/:name', async (req, res) => {
    const gameName = req.params.name;
    const gameId = req.params.id;
    try {
        const response = await axios.get(`${BASE_URL}/${gameId}`, config);
        const gameDetails = response.data;
        //const data = JSON.parse(fs.readFileSync('./game-detail.json', 'utf8'));
        res.render('game.ejs', { game: gameDetails, gameName: gameName });
    } catch (error) {
        res.status(500).send(error.response.data.message);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
