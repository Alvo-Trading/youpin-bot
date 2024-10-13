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

app.post('/SendSignInSmsCode', async (req, res) => {
    try {
        // Extract SessionId from the incoming request body
        const {SessionId} = req.body;

        if (!SessionId) {
            return res.status(400).json({error: 'SessionId is required in the request body.'});
        }

        // Construct new JSON body
        const newBody = {
            Mobile: '649540298',
            Area: '31',
            SessionId: SessionId,  // Keep original SessionId
        };

        delete req.headers.host
        // Forward the request with headers and the newly constructed body
        const proxyResponse = await fetch('https://api.youpin898.com/api/user/Auth/SendSignInSmsCode', {
            method: 'POST',
            headers: {
                ...req.headers,  // Forward all original headers
                'Content-Type': 'application/json', // Ensure content-type is JSON
            },
            body: JSON.stringify(newBody),
        });

        // Get the response from the proxied request
        const responseBody = await proxyResponse.json();
        const responseHeaders = JSON.parse(JSON.stringify(proxyResponse.headers)); // Get all headers as an object

        console.log(responseHeaders)
        // Return the response from the proxied request
        res.status(proxyResponse.status).set(responseHeaders).json(responseBody);
    } catch (error) {
        console.error('Error while proxying request:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

app.post('/SmsSignIn', async (req, res) => {
    try {
        // Extract SessionId from the incoming request body
        const {SessionId, Code} = req.body;

        if (!SessionId || !Code) {
            return res.status(400).json({error: 'SessionId is required in the request body.'});
        }

        // Construct new JSON body
        const newBody = {
            Mobile: '649540298',
            Area: '31',
            SessionId: SessionId,
            Code: Code,
        };

        delete req.headers.host
        // Forward the request with headers and the newly constructed body
        const proxyResponse = await fetch('https://api.youpin898.com/api/user/Auth/SmsSignIn', {
            method: 'POST',
            headers: {
                ...req.headers,  // Forward all original headers
                'Content-Type': 'application/json', // Ensure content-type is JSON
            },
            body: JSON.stringify(newBody),
        });

        // Get the response from the proxied request
        const responseBody = await proxyResponse.json();
        const responseHeaders = JSON.parse(JSON.stringify(proxyResponse.headers)); // Get all headers as an object

        console.log(responseHeaders)
        // Return the response from the proxied request
        res.status(proxyResponse.status).set(responseHeaders).json(responseBody);
    } catch (error) {
        console.error('Error while proxying request:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
