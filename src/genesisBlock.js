const Block = require("./block");
const Utilities = require("./utilities");

const genesisIndex = 0;
const genesisPreviousHash = "0";
const genesisTimeStamp = Utilities.getTimeStamp();
const genesisData = "I AM GENESIS";
const genesisHash = "61c5f1a9817e84644f1e5cf4dccc5207a2c94d101127fc2338eba7c5a19c850f";
const genesisNonce = 0;
const genesisDifficulty = 0;
const genesisBlock = new Block(genesisIndex, genesisPreviousHash, genesisTimeStamp, genesisData, genesisHash, genesisDifficulty, genesisNonce);

module.exports = genesisBlock;