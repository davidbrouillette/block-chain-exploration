const express = require("express");
const bodyParser = require("body-parser"); 
const BlockChain = require("./blockChain");
const GenesisBlock = require("./genesisBlock");

const PORT = 7894;

var initHttpServer = () => {
    var app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    const blockChain = new BlockChain(GenesisBlock);


    app.get('/blocks', (req, res) => {
        res.send(JSON.stringify(blockChain.chain));
    });

    app.post('/mineBlock', (req, res) => {
        var newBlock = blockChain.generateNextBlock(req.body.data);
        console.log('block added: ' + JSON.stringify(newBlock));
        res.send('Block Added: ' + JSON.stringify(newBlock));
    });

    app.listen(PORT, () => {
        console.log('Listening http on port: ' + PORT)
    });
};



initHttpServer();