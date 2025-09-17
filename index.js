import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const API_KEY = "6eeea2c7540e426daf93fd2583f10313";
const config = { headers: { "x-api-key": API_KEY } };
const BASE_URL = "https://api.gamebrain.co/v1/games";
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    //const defaultGames = await axios.get(`${BASE_URL}?limit=10`, config);
    //res.render('index.ejs', {games: defaultGames.data.results});
    res.render('index.ejs', { games: [1,2,3,6,5,3,2,4,2,52,5] });
});
app.get('/search', async (req, res) => {
    const query = req.body.query;
    try {
        const response = await axios.get(`${BASE_URL}?query=${query}`, config);
        const games = response.data.results;
        res.render('index.ejs', { games });
    } catch (error) {
        console.error(error); 
        res.status(500).send("An error occurred while fetching game data.");
    }
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

