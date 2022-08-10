const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 6900;

// Where we will keep books
let hotels = [];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/hotels', (req, res) => {
    const hotel = req.body;

    // Output the book to the console for debugging
    console.log(hotel);
    flights.push(hotel);

    res.send('Hotel is added to the database');
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));

app.get('/hotels', (req, res) => {
    res.json(hotels);
});