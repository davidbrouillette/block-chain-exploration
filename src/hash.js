const crypto = require('crypto');

function calculateHashForBlock(block, hmacKey){
    return calculateHash(block.index, block.previousHash, block.timestamp, block.data, hmacKey);
}

function calculateHash(index, previousHash, timestamp, data, difficulty, nonce, hmacKey){
    let buf = Buffer.from((timestamp + nonce + previousHash +  data + index + difficulty), "utf-8");
    let hmac = crypto.createHmac('sha256', hmacKey);
    let hash = hmac.update(buf);
    return hash.digest('hex');
}

function hashMatchesDifficulty(hash, difficulty){
    let binaryHash = hashToBinary(hash);
    let prefix = '0'.repeat(difficulty);
    return binaryHash.startsWith(prefix);
}

function hashToBinary(hash){
    return hash.split('').map((char)=>{
        return char.charCodeAt(0).toString(2).padStart(8,"0");
    }).join("");
}


module.exports = {
    calculateHash,
    calculateHashForBlock,
    hashMatchesDifficulty,
    hashToBinary
};