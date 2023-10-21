const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {Database} = require('@tableland/sdk');
require("dotenv").config();
const {ethers, Wallet} = require('ethers');
const {keccak256, defaultAbiCoder, hexConcat, arrayify} = require('ethers/lib/utils');
const { parse } = require("dotenv");
const PAYMASTER_ABI = require("./paymaster.abi.json")
const ENTRYPOINT_ABI = require("./entrypoint.abi.json")

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

const getRpcAndAddress = (chainId) => {
    let rpc = "", address = ""
    switch (chainId) {
        case 137:
            rpc = "https://polygon.rpc.thirdweb.com"
            address = "0x8166E83E6C0C09A72891436341F89B450Cf219Bf"
            break;
        case 10:
            rpc = 'https://optimism.rpc.thirdweb.com'
            address = "0x0cC3D5BfAa0eF5217Ec5f2Fa2F85d5AE2eb518E4"
            break;
        case 80001:
            rpc = 'https://mumbai.rpc.thirdweb.com'
            address = "0x8166E83E6C0C09A72891436341F89B450Cf219Bf"
            break;
        case 534351:
            rpc = 'https://scroll-sepolia-testnet.rpc.thirdweb.com'
            address = "0x0cC3D5BfAa0eF5217Ec5f2Fa2F85d5AE2eb518E4"
            break;
        case 11155111:
            rpc = 'https://sepolia.rpc.thirdweb.com'
            address = "0x8166E83E6C0C09A72891436341F89B450Cf219Bf"
            break;
        case 5001:
            rpc = 'https://rpc.ankr.com/mantle_testnet'
            address = "0x0cC3D5BfAa0eF5217Ec5f2Fa2F85d5AE2eb518E4"
            break;
        default:
            rpc = 'https://mumbai.rpc.thirdweb.com'
            address = "0x0cC3D5BfAa0eF5217Ec5f2Fa2F85d5AE2eb518E4"
    }   
    return {rpc, address}
}

const ENTRYPOINT = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"

async function packUserOp (op, forSignature = true) {
    if (forSignature) {
        return defaultAbiCoder.encode(
            ['address', 'uint256', 'bytes32', 'bytes32',
                'uint256', 'uint256', 'uint256', 'uint256', 'uint256',
                'bytes32'],
            [op.sender, op.nonce, keccak256(await op.initCode), keccak256(await op.callData),
                op.callGasLimit, op.verificationGasLimit, op.preVerificationGas, op.maxFeePerGas, op.maxPriorityFeePerGas,
                keccak256(await op.paymasterAndData)])
    } else {
        // for the purpose of calculating gas cost encode also signature (and no keccak of bytes)
        return defaultAbiCoder.encode(
            ['address', 'uint256', 'bytes', 'bytes',
                'uint256', 'uint256', 'uint256', 'uint256', 'uint256',
                'bytes', 'bytes'],
            [op.sender, op.nonce, op.initCode, op.callData,
                op.callGasLimit, op.verificationGasLimit, op.preVerificationGas, op.maxFeePerGas, op.maxPriorityFeePerGas,
                op.paymasterAndData, op.signature])
    }
}

async function getUserOpHash (op, chainId) {
    const userOpHash = keccak256(await packUserOp(op, true))
    const enc = defaultAbiCoder.encode(
        ['bytes32', 'address', 'uint256'],
        [userOpHash, ENTRYPOINT, chainId])
    return keccak256(enc)
}

app.post("/paymaster", async (req, res) => {
    const {chainId, userOp} = req.body;
    const {rpc, address} = getRpcAndAddress(parseInt(chainId));

    const provider = new ethers.providers.JsonRpcProvider(rpc)
    const offChainSigner = new ethers.Wallet(process.env.OFFCHAIN_SIGNER_PRIVATE_KEY, provider)
    const accountOwner = new ethers.Wallet(process.env.ACCOUNT_OWNER_PRIVATE_KEY, provider)

    const paymaster = new ethers.Contract(address, PAYMASTER_ABI, accountOwner)
    const entrypoint = new ethers.Contract(ENTRYPOINT, ENTRYPOINT_ABI, accountOwner)

    const currentBlock = await provider.getBlockNumber();
    const blockTimestamp = (await provider.getBlock(currentBlock)).timestamp;
    const validUntil = blockTimestamp + 3 * 60; // add 3 minutes
    const validAfter = blockTimestamp;

    //convert timestamps to hex
    const validUntilHex = ethers.BigNumber.from(validUntil).toHexString();
    const validAfterHex = ethers.BigNumber.from(validAfter).toHexString();

    let paymasterAndData = hexConcat([paymaster.address, defaultAbiCoder.encode(['uint48', 'uint48'], [validUntilHex, validAfterHex]), '0x' + '00'.repeat(65)])
    userOp.paymasterAndData = paymasterAndData

    userOp.signature = await accountOwner.signMessage(arrayify(await getUserOpHash(userOp, parseInt(chainId))))

    let hash = await paymaster.getHash(userOp, validUntilHex, validAfterHex)
    let sig = await offChainSigner.signMessage(arrayify(hash))

    paymasterAndData = hexConcat([paymaster.address, defaultAbiCoder.encode(['uint48', 'uint48'], [validUntilHex, validAfterHex]), sig])

    res.status(200).json({receipt: paymasterAndData})
})

app.listen(3003, () => {
    console.log('Server started on port 3003');
});