const express = require('express');
const { saveBlock, getBlockData, getChainSummary } = require('../controllers/blockController');

const routes = new express.Router();

routes.post('/block', saveBlock);

routes.get('/block/:blockNumber', getBlockData);

routes.get('/blocks/stats', getChainSummary);
module.exports = { routes };

// Create a NodeJS HTTP server with support for following APIs
// i. POST /block
// 1. To add a new block in the blockchain
// 2. Request - { “data”: “123” }
// 3. Response - { “blockNo”: “”, “blockHash”: “”, “nounce”: “”, “previousHash”: “” }


// ii. GET /block
// 1. To get an existing block from the chain
// 2. Request query params: blockNo
// 3. Response: { “blockHash”: “”, “data”: “”, “nounce”: “”, “previousHash”: “”, “blockNo”: “” }


// iii. GET /block/stats
// 1. To get info about the chain
// 2. No request query params
// 3. Response: { “blockCount”: “”, “latestBlockHash”: “” }