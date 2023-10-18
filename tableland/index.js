const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {Database} = require('@tableland/sdk');
require("dotenv").config();
const {ethers, Wallet} = require('ethers');

// Parse JSON request bodies
app.use(bodyParser.json());

const TABLELAND = "tx_data_80001_7889"
const MUMBAI_RPC = 'https://mumbai.rpc.thirdweb.com'

app.get('/', async (req, res) => {
    const {sender, chainId} = req.query;
    console.log(req.query)
    const db = new Database();
    const {results} = await db.prepare(`SELECT * FROM ${TABLELAND} WHERE sender='${sender}' AND chainId=${chainId};`).all()
    console.log(results);
    res.json({results});
});

app.post('/', async (req, res) => {
    // Parse the request body
    const {sender, receiver, hash, value, date, chainId} = req.body;
    console.log(req.body);
    const dbPvtKey = process.env.DB_PVT_KEY;
    const wallet = new Wallet(dbPvtKey);
    const signer = wallet.connect(
        new ethers.providers.JsonRpcProvider(MUMBAI_RPC)
    );
    const db = new Database({signer});
    const {meta: insert} = await db.prepare(
        `INSERT INTO ${TABLELAND} (sender, receiver, value, chainId, hash, date) VALUES (?, ?, ?, ?, ?, ?);`
    ).bind(sender, receiver, value, parseInt(chainId), hash, date)
        .run();
    console.log(insert)
    try {
        await insert.txn?.wait();
    } catch (e) {
        console.log(e)
    }
    res.json({success: true});
});

app.listen(3003, () => {
    console.log('Server started on port 3003');
});