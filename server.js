// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express')
const app = express()
const port = 3000

// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors'); 
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.get('/', (req, res) => res.send('weather App'));

app.listen(port, () => console.log(`weather app listening at http://localhost:${port}`))


// Callback function to complete GET '/all'

app.get('/all', (request, response) => {
    response.send(projectData);
});

// Post Route
app.post('/projectData', (request, response) => {
    //Post Data Now
    projectData={
        temp:request.body.temp,
        date:request.body.date,
        content:request.body.content
    };
    response.send(projectData);
}); 