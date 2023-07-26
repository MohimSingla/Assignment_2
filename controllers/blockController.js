const fs = require('fs');
const {createHash} = require('crypto');

const zeroHash = "0000000000000000000000000000000000000000000000000000000000000000";

const findCorrectHash = (blockNumber, data, prevHash) => {
    for (i = 0; i<100000;i++)
    {
        const stringData = JSON.stringify({blockNumber, data, prevHash, nonce: i});
        let blockHash = createHash('sha256').update(stringData).digest('hex');
        if(blockHash[0]+blockHash[1]=="00")
        {
            return blockHash;
        }
    }
    throw new Error("Hash with such difficulty not found. Hence, Cannot add block with this data.")
}

const saveBlock = async (req, res) => {
    try{
        //new data
        const newData = (req.body.data);

        //prev data read
        const prevData = await fs.readFileSync('./db/blocksData.json',  'utf8');
        const prevDataJson = JSON.parse(prevData);
        const prevBlockData = prevDataJson[prevDataJson.length - 1];

        // create new block's data with correct hash key.
        const blockHash = await findCorrectHash(prevBlockData.blockNumber + 1, newData, prevBlockData.blockHash);
        const newBlockData = {
            blockNumber: prevBlockData.blockNumber + 1,
            data: newData,
            prevHash: prevBlockData.blockHash,
            blockHash
        }
        const newBlock = [...prevDataJson, newBlockData] ;
        fs.writeFile('./db/blocksData.json', JSON.stringify(newBlock), (error) => { 
            if (error)
            {
                throw new Error({error: error.message});
            }
        })
        res.send("Block added successfully.")
    }
    catch(error)
    {
        console.log(error);
        res.status(400).send(error.message);
    }
};

const getBlockData = async (req, res) => {
    try{
        const blockNumber = req.params.blockNumber;
        const prevData = await fs.readFileSync('./db/blocksData.json',  'utf8');
        const prevDataJson = JSON.parse(prevData);
        if(blockNumber >= prevDataJson.length)
        {
            return res.send({
                data: {},
                message: "No Block with requested block number found."
            })
        }
        res.send({data: prevDataJson[blockNumber]});
    }
    catch(error){
        res.send({error: error.message});
    }
    
}

const getChainSummary = async (req, res) => {
    try{
        const prevData = await fs.readFileSync('./db/blocksData.json',  'utf8');
        const prevDataJson = JSON.parse(prevData);
        res.send({
            blockCount: prevDataJson.length, 
            latestBlockHash: prevDataJson[prevDataJson.length - 1].blockHash
        })
    }
    catch(error){
        res.status(400).send({error: error.message});
    }
}

module.exports = { saveBlock, getBlockData, getChainSummary };