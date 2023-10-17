const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Database } = require('@tableland/sdk');
require("dotenv").config();
const { ethers, Wallet } = require('ethers');

// Parse JSON request bodies
app.use(bodyParser.json());

const TABLELAND = "mumbai_data_80001_7782"
const MUMBAI_RPC = 'https://mumbai.rpc.thirdweb.com'

app.get('/', (req, res) => {
    // Fetch data from the database
    const db = new Database();
    db.getData((err, data) => {
        if (err) {
            res.status(500).send('Error');
        } else {
            res.send(data);
        }
    });
});

app.post('/', async (req, res) => {
    // Parse the request body
    const { sender, receiver, hash, value, date } = req.body;
    console.log(req.body);

    const dbPvtKey = process.env.DB_PVT_KEY;
    const wallet = new Wallet(dbPvtKey);
    const signer = wallet.connect(
        new ethers.providers.JsonRpcProvider(MUMBAI_RPC)
    );
    const db = new Database({ signer });
    console.log(db.config)
    const { meta: insert } = await db.prepare(
        `INSERT INTO ${TABLELAND} (sender, receiver, hash, value, date) VALUES (?, ?, ?, ?, ?);`
    ).bind(sender, receiver, hash, value, date)
        .run();
    console.log(insert)
    await insert.txn?.wait();
    res.send('Success');
});

app.listen(3003, () => {
    console.log('Server started on port 3003');
});