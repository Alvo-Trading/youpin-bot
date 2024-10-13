import fetch from 'node-fetch';
import express from 'express';

const app = express();
app.use(express.json()); // middleware to parse incoming JSON bodies
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', '*');
    // Handle preflight OPTIONS requests quickly
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204); // No content
    }
    next();
});

app.post('/', async (req, res) => {
    try {
        res.status(200).set({
                'access-control-allow-origin': '*',
                'api-supported-versions': '1.0',
                'connection': 'keep-alive',
                'content-length': '97',
                'content-type': 'application/json; charset=utf-8',
                'date': 'Sun, 13 Oct 2024 13:45:55 GMT',
                'env': 'Production',
                'servertimestamp': '1728827155',
                'strict-transport-security': 'max-age=15724800; includeSubDomains',
                'x-response-time-ms': '128'
            }
        ).json({});
    } catch (error) {
        console.error('Error while proxying request:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
