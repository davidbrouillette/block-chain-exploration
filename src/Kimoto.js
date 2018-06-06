const Utilities = require('./utilities');
const BlockChain = require("./blockChain");
const GenesisBlock = require("./genesisBlock");







function calculateDifficulty(latestBlock, chain, expected_interval=2.5){

        
    let oneDay = 1440 / expected_interval;
    let nMin = oneDay / 4;
    let nMax = oneDay * 7;
    let x = Utilities.range(nMin, nMax);

    let t0 = Utilities.arrayRandomFill(nMax).map(x=> 2.5 + x/4);
    let t1 = Utilities.arrayRandomFill(nMax).map(x=> 2.5 + x/4);

    t0[oneDay] = 2.5 / (1.2 + Utilities.arrayRandomFill(oneDay).map((y)=> {return (y / 4)}).reduce((i,y)=>{return i+y},0));
    t1[oneDay] = 2.5 / (0.9 + Utilities.arrayRandomFill(oneDay).map((y)=> {return (y / 4)}).reduce((i,y)=>{return i+y},0));
    
    let adjust0 = (Utilities.range(nMin,nMax+1).map(y=>y*2.5).reduce((i,y)=>{return i+y},0));
    let adjust1 = (Utilities.range(nMin,nMax+1).map(y=>y*2.5).reduce((i,y)=>{return i+y},0));

    let s = Utilities.range(0, nMax);

    let xKimoto = x.map(y=>y/oneDay);
    let xfnMaxKimoto = x.map(y=>kimoto(y));
    let MaxKimoto = xKimoto.map((y,i)=> [y,xfnMaxKimoto[i]]);
    
    let xfnMinKimoto = x.map(y=> 1/kimoto(y));
    let MinKimoto = xKimoto.map((y,i)=> [y,xfnMinKimoto[i]]);

    let sKimoto = s.map(y=>y/oneDay);
    let SMaxKimoto = sKimoto.map((y,i)=>[y,adjust0[i]]);
    let SMinKimoto = sKimoto.map((y,i)=>[y,adjust1[i]]);

    console.log(`maxKimoto: ${MaxKimoto}`);
    // console.log(`MinKimoto: ${MinKimoto}`);
    // console.log(`SMaxKimoto: ${SMaxKimoto}`);
    // console.log(`SMinKimoto: ${SMinKimoto}`);

    //return this.getAdjustedDifficulty(latestBlock, chain, expected_interval, adjustment_interval);

    return latestBlock.difficulty;
}

function  kimoto(x){
    return 1 + (0.7084 * ((x**2/144**2)**-1.228));
}








const testArray = [{ "index": 0, "previousHash": "0", "timestamp": 1528128167, "data": "I AM GENESIS", "hash": "61c5f1a9817e84644f1e5cf4dccc5207a2c94d101127fc2338eba7c5a19c850f", "nonce": 0, "difficulty": 0 }, { "index": 1, "previousHash": "61c5f1a9817e84644f1e5cf4dccc5207a2c94d101127fc2338eba7c5a19c850f", "timestamp": 1528128168, "data": "\"Added through a post\"asdfasdfasdf", "hash": "e1446f7d84d051be21cfe0c0e799cea16e8b5b7bdd091690323795e6e80d6e92", "nonce": 0, "difficulty": 0 }, { "index": 2, "previousHash": "e1446f7d84d051be21cfe0c0e799cea16e8b5b7bdd091690323795e6e80d6e92", "timestamp": 1528128169, "data": "\"Added through a post\"asdfasdfasdf", "hash": "abc003288ba94f0faeb0427c49d74838a45f6aeff50ea8d2b87f7039304f64b6", "nonce": 0, "difficulty": 0 }, { "index": 3, "previousHash": "abc003288ba94f0faeb0427c49d74838a45f6aeff50ea8d2b87f7039304f64b6", "timestamp": 1528128169, "data": "\"Added through a post\"asdfasdfasdf", "hash": "2b68a5c3eb51321a0c7651c1585dbd40e4c390bbcbc76f9dbef03e1fb3857480", "nonce": 0, "difficulty": 0 }, { "index": 4, "previousHash": "2b68a5c3eb51321a0c7651c1585dbd40e4c390bbcbc76f9dbef03e1fb3857480", "timestamp": 1528128169, "data": "\"Added through a post\"asdfasdfasdf", "hash": "59629e254557e7926a49753d4feed7f822a10e6d30a9e7cdfa6c0388b9e36cb3", "nonce": 0, "difficulty": 0 }, { "index": 5, "previousHash": "59629e254557e7926a49753d4feed7f822a10e6d30a9e7cdfa6c0388b9e36cb3", "timestamp": 1528128170, "data": "\"Added through a post\"asdfasdfasdf", "hash": "3d0c539e8ba42fabdea0e22dec0587d653b4240bfc3a6ef51d6c99915322c15e", "nonce": 0, "difficulty": 0 }, { "index": 6, "previousHash": "3d0c539e8ba42fabdea0e22dec0587d653b4240bfc3a6ef51d6c99915322c15e", "timestamp": 1528128170, "data": "\"Added through a post\"asdfasdfasdf", "hash": "58cddd51f2f5536dfdf89dd18b454f366045aeb30a3283a80caeb80ae05cf23d", "nonce": 0, "difficulty": 0 }, { "index": 7, "previousHash": "58cddd51f2f5536dfdf89dd18b454f366045aeb30a3283a80caeb80ae05cf23d", "timestamp": 1528128171, "data": "\"Added through a post\"asdfasdfasdf", "hash": "59089639b472f54c96b171f9dea65ad8f6990952732544d4ae001a06ff6e6418", "nonce": 0, "difficulty": 0 }, { "index": 8, "previousHash": "59089639b472f54c96b171f9dea65ad8f6990952732544d4ae001a06ff6e6418", "timestamp": 1528128171, "data": "\"Added through a post\"asdfasdfasdf", "hash": "af9205f140bd6d26fdf32ff6038be3951b208e808453aec4bf0c16c0f613dd37", "nonce": 0, "difficulty": 0 }, { "index": 9, "previousHash": "af9205f140bd6d26fdf32ff6038be3951b208e808453aec4bf0c16c0f613dd37", "timestamp": 1528128173, "data": "\"Added through a post\"asdfasdfasdf", "hash": "a5619f37333bfacef8b3525a0e3a12b298aad7247756d7f6e7d4146f238bcb57", "nonce": 0, "difficulty": 0 }, { "index": 10, "previousHash": "a5619f37333bfacef8b3525a0e3a12b298aad7247756d7f6e7d4146f238bcb57", "timestamp": 1528128173, "data": "\"Added through a post\"asdfasdfasdf", "hash": "fd8c29399780ef884728594247fcb5012a5cc07cc2dbd6c2873ece009b133e6a", "nonce": 0, "difficulty": 0 }, { "index": 11, "previousHash": "fd8c29399780ef884728594247fcb5012a5cc07cc2dbd6c2873ece009b133e6a", "timestamp": 1528128173, "data": "\"Added through a post\"asdfasdfasdf", "hash": "583f1415fe84caf07b38afb65914c457a3b2683c357f878e463b766d5835df5a", "nonce": 0, "difficulty": 1 }, { "index": 12, "previousHash": "583f1415fe84caf07b38afb65914c457a3b2683c357f878e463b766d5835df5a", "timestamp": 1528128174, "data": "\"Added through a post\"asdfasdfasdf", "hash": "6774c3b9c2b3e8b8176a61ba65c75ffa077b06ffa76a1ae6a31d03a03b8c2ae3", "nonce": 0, "difficulty": 1 }];



const blockChain = new BlockChain(GenesisBlock);

blockChain.chain = testArray;



calculateDifficulty(blockChain.chain[blockChain.chain.length - 1], blockChain.chain);