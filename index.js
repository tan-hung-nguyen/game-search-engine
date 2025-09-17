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

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});