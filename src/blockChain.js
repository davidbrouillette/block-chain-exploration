const Utilities = require("./utilities");
const Block = require('./block');
const Hash = require('./hash');
const Difficulty = require('./difficulty');

class BlockChain{
    constructor(genesis){
        this.HMAC_KEY = "HMAC_KEY";
        this.BLOCK_GENERATION_INTERVAL = 10;
        this.DIFFICULTY_ADJUSTMENT_INTERVAL = 10;
        this.EXPECTED_TIME_INTERVAL = this.BLOCK_GENERATION_INTERVAL * this.DIFFICULTY_ADJUSTMENT_INTERVAL;

        this.chain = [genesis];
        
        this.getTimeStamp = Utilities.getTimeStamp;
        this.calculateHash = Hash.calculateHash;
        this.calculateHashForBlock = Hash.calculateHashForBlock;
        this.hashMatchesDifficulty = Hash.hashMatchesDifficulty;
        this.getDifficulty = Difficulty.getDifficulty;
        this.getAdjustedDifficulty = Difficulty.getAdjustedDifficulty;
    }

    addBlock(block){
        this.chain.push(block);
    }

    getLatestBlock(){
        return this.chain[(this.chain.length - 1)];
    }

    isValidNewBlock(newBlock, previousBlock){
        if((previousBlock.index + 1) !== newBlock.index){
            return false;
        } else if (previousBlock.hash !== newBlock.previousHash){
            return false;
        } else if(this.calculateHashForBlock(newBlock, this.HMAC_KEY) !== newBlock.hash){
            return false;
        }
        return true;
    }

    generateNextBlock(blockData){
        let previousBlock = this.getLatestBlock();
        let nextIndex = previousBlock.index + 1;
        let nextTimestamp = this.getTimeStamp();
        let difficulty = this.getDifficulty(previousBlock, this.chain, this.BLOCK_GENERATION_INTERVAL, this.DIFFICULTY_ADJUSTMENT_INTERVAL);
        let nextBlock = this.findBlock(nextIndex, previousBlock.hash, nextTimestamp, blockData, difficulty);
        
        this.addBlock(nextBlock);
        
        return nextBlock;
    }
    
    findBlock(index, previousHash, timestamp, data, difficulty){
        let nonce = 0;
        let newBlock = null;
        while(!newBlock){
            let hash = this.calculateHash(index, previousHash, timestamp, data, difficulty, nonce, this.HMAC_KEY);
            if(this.hashMatchesDifficulty(hash, difficulty)){
                newBlock = new Block(index, previousHash, timestamp, data, hash, difficulty, nonce);
            }
            nonce++;
        }
        return newBlock;
    }
}


module.exports = BlockChain;