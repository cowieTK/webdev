import express from 'express';

const app = express();

// CORS shit
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// pokemon get
app.get('/test/:name', async (req, res) => {

    const pokemon_name: string = req.params.name;

    try {   
        // no timeout for now
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_name}`);
        const data = await response.json();
        res.json(data);

    } catch (error) {
        res.status(500).send('API fetch fucked');
    }
});


app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});