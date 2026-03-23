import express from 'express';
import fetch from 'node-fetch';
const app = express();
const planets = (await import('npm-solarsystem')).default;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', async (req, res) => {
    const response = await fetch('https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q=solar%20system');
    const data = await response.json();
    const index = Math.floor(Math.random() * data.hits.length);
    const image = data.hits[index];
    res.render('home.ejs', {image});
});

app.get('/planet-info', (req, res) => {
    let planet = req.query.planet;
    let planet_info = planets[`get${planet}`]();
    res.render('planet-info.ejs', {planet_info})
});
 
app.get('/comet-asteroids', (req, res) => {
    let type = req.query.type;
    let comet_asteroid_info = planets[`get${type}`]();
    res.render('comet-asteroids.ejs', {comet_asteroid_info})
});

app.get('/NASA-POD', async (req, res) => {
    date = new Date().toISOString().split('T')[0];
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD&date=${date}`);
    const data = await response.json();
    res.render('nasa-pod.ejs', {data});
});

app.listen(3000, () => {
    console.log('server started');
});