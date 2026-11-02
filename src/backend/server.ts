import express from 'express';

const app = express();


type Bonkdog = {
    hp: number;
    attack: number;
    defence: number;
    special_attack: number;
    special_defence: number;
    speed: number;
    fired_up: boolean,
    iced_up: boolean,
};

const bonkdog: Bonkdog = {
    hp: 100,
    attack: 150,
    defence: 75,
    special_attack: 50,
    special_defence: 70,
    speed: 100,
    fired_up: false,
    iced_up: false,
};

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

// bonkdog get
app.get('/getdog', async (req, res) => {
    try {   
        res.json(bonkdog);

    } catch (error) {
        res.status(67).send('bonkdog is broke');
    }
});


app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});