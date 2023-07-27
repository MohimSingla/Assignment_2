const express = require('express');
const { saveBlock, getBlockData, getChainSummary } = require('../controllers/blockController');

const routes = new express.Router();


routes.post('/block', saveBlock);

routes.get('/block/:blockNumber', getBlockData);

routes.get('/blocks/stats', getChainSummary);


module.exports = { routes };