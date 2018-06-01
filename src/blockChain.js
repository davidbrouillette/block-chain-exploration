const Utilities = require("./utilities");
const crypto = require('crypto');
const Block = require('./block');

class BlockChain{
    constructor(genesis){
        this.HMAC_KEY = "HMAC_KEY";
        this.BLOCK_GENERATION_INTERVAL = 10;
        this.DIFFICULTY_ADJUSTMENT_INTERVAL = 10;
        this.EXPECTED_TIME_INTERVAL = this.BLOCK_GENERATION_INTERVAL * this.DIFFICULTY_ADJUSTMENT_INTERVAL;

        this.chain = [genesis];
        
        this.getTimeStamp = Utilities.getTimeStamp;
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
        } else if(this.calculateHashForBlock(newBlock) !== newBlock.hash){
            return false;
        }
        return true;
    }

    generateNextBlock(blockData){
        let previousBlock = this.getLatestBlock();
        let nextIndex = previousBlock.index + 1;
        let nextTimestamp = this.getTimeStamp();
        let difficulty = this.getDifficulty(previousBlock);
        let nextBlock = this.findBlock(nextIndex, previousBlock.hash, nextTimestamp, blockData, difficulty);
        
        this.addBlock(nextBlock);
        
        return nextBlock;
    }
    
    calculateHashForBlock(block){
        return this.calculateHash(block.index, block.previousHash, block.timestamp, block.data);
    }

    calculateHash(index, previousHash, timestamp, data, difficulty, nonce){
        let buf = Buffer.from((timestamp + nonce + previousHash +  data + index + difficulty), "utf-8");
        let hmac = crypto.createHmac('sha256', this.HMAC_KEY);
        let hash = hmac.update(buf);
        return hash.digest('hex');
    }

    hashMatchesDifficulty(hash, difficulty){
        let binaryHash = this.hashToBinary(hash);
        let prefix = '0'.repeat(difficulty);
        return binaryHash.startsWith(prefix);
    }

    hashToBinary(hash){
        return hash.split('').map((char)=>{
            return char.charCodeAt(0).toString(2).padStart(8,"0");
        }).join("");
    }

    findBlock(index, previousHash, timestamp, data, difficulty){
        let nonce = 0;
        let newBlock = null;
        while(!newBlock){
            let hash = this.calculateHash(index, previousHash, timestamp, data, difficulty, nonce);
            // console.log(hash);
            // console.log("\n");
            if(this.hashMatchesDifficulty(hash, difficulty)){
                newBlock = new Block(index, previousHash, timestamp, data, hash, difficulty, nonce);
            }
            nonce++;
        }
        return newBlock;
    }

    getDifficulty(latestBlock){
        if(latestBlock.index % this.DIFFICULTY_ADJUSTMENT_INTERVAL === 0 && latestBlock.index !== 0){
            return this.getAdjustedDifficulty(latestBlock);
        }
        return latestBlock.difficulty;
    }

    getAdjustedDifficulty(latestBlock){
        let prevAdjustmentBlock = this.chain[this.chain.length - this.DIFFICULTY_ADJUSTMENT_INTERVAL];
        let timeTaken = latestBlock.timestamp - prevAdjustmentBlock.timestamp;
        
        if(timeTaken < (this.EXPECTED_TIME_INTERVAL / 2)){
            return prevAdjustmentBlock.difficulty + 1;
        } else if (timeTaken > (this.EXPECTED_TIME_INTERVAL * 2)){
            return prevAdjustmentBlock.difficulty - 1;
        } else if(prevAdjustmentBlock.difficulty !== 0){
            return prevAdjustmentBlock.difficulty;
        } else {
            return 1;
        }
    }
}


module.exports = BlockChain;