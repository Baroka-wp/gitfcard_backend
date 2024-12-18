import { createServer } from 'http';
import { kkiapay } from '@kkiapay-org/nodejs-sdk';
import dotenv from 'dotenv';
dotenv.config();

const k = kkiapay({
    privatekey: process.env.PRIVATE_KEY,
    publickey: process.env.PUBLIC_KEY,
    secretkey: process.env.SECRET_KEY,
    sandbox: true // comme on est en mode test, on met cette option à true
});

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
    if (req.url === '/pay' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const { amount, phone, name } = JSON.parse(body);
            try {
                const transaction = await k.requestPayment({
                    amount,
                    phone,
                    name,
                    sandbox: true
                });
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(transaction));
            } catch (error) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: error.message }));
            }
        });
    } else if (req.url === '/verify' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const { transactionId } = JSON.parse(body);
            try {
                const response = await k.verify(transactionId);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(response));
            } catch (error) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: error.message }));
            }
        });
    } else {
        res.statusCode = 404;
        res.end('WELCOME GIFT!!!');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});