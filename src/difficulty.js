const Utilities = require('./utilities');

class SimpleDifficulty{
    static getDifficulty(latestBlock, chain, expected_interval, adjustment_interval){
        if(latestBlock.index % adjustment_interval === 0 && latestBlock.index !== 0){
            return this.getAdjustedDifficulty(latestBlock, chain, expected_interval, adjustment_interval);
        }
        return latestBlock.difficulty;
    }
    
    static getAdjustedDifficulty(latestBlock, chain, expected_interval, adjustment_interval){
        let prevAdjustmentBlock = chain[chain.length - adjustment_interval];
        let timeTaken = latestBlock.timestamp - prevAdjustmentBlock.timestamp;
        
        if(timeTaken < (expected_interval / 2)){
            return prevAdjustmentBlock.difficulty + 1;
        } else if (timeTaken > (expected_interval * 2)){
            return prevAdjustmentBlock.difficulty - 1;
        } else if(prevAdjustmentBlock.difficulty !== 0){
            return prevAdjustmentBlock.difficulty;
        } else {
            return 1;
        }
    }
        
}

// class KimotoGravityWell{
//     static getDifficulty(latestBlock, chain, expected_interval=2.5, adjustment_interval){

        
//             let oneDay = 1440 / expected_interval;
//             let nMin = oneDay / 4;
//             let nMax = oneDay * 7;
//             let x = Utilities.range(nMin, nMax);

//             let t0 = Utilities.arrayRandomFill(nMax).map(x=> 2.5 + x/4);
//             let t1 = Utilities.arrayRandomFill(nMax).map(x=> 2.5 + x/4);

//             t0[oneDay] = 2.5 / (1.2 + Utilities.arrayRandomFill(oneDay).map((y)=> {return (y / 4)}).reduce((i,y)=>{return i+y},0));
//             t1[oneDay] = 2.5 / (0.9 + Utilities.arrayRandomFill(oneDay).map((y)=> {return (y / 4)}).reduce((i,y)=>{return i+y},0));
            
//             let adjust0 = (Utilities.range(nMin,nMax+1).map(y=>y*2.5).reduce((i,y)=>{return i+y},0));
//             let adjust1 = (Utilities.range(nMin,nMax+1).map(y=>y*2.5).reduce((i,y)=>{return i+y},0));

//             let s = Utilities.range(0, nMax);

//             let xKimoto = x.map(y=>y/oneDay);
//             let xfnMaxKimoto = x.map(y=>this.kimoto(y));
//             let MaxKimoto = xKimoto.map((y,i)=> [y,xfnMaxKimoto[i]]);
            
//             let xfnMinKimoto = x.map(y=> 1/this.kimoto(y));
//             let MinKimoto = xKimoto.map((y,i)=> [y,xfnMinKimoto[i]]);

//             let sKimoto = s.map(y=>y/oneDay);
//             let SMaxKimoto = sKimoto.map((y,i)=>[y,adjust0[i]]);
//             let SMinKimoto = sKimoto.map((y,i)=>[y,adjust1[i]]);

//             console.log(`maxKimoto: ${MaxKimoto}`);
//             console.log(`MinKimoto: ${MinKimoto}`);
//             console.log(`SMaxKimoto: ${SMaxKimoto}`);
//             console.log(`SMinKimoto: ${SMinKimoto}`);

//             //return this.getAdjustedDifficulty(latestBlock, chain, expected_interval, adjustment_interval);
        
//         return latestBlock.difficulty;
//     }

//     static kimoto(x){
//         return 1 + (0.7084 * ((x**2/144**2)**-1.228));
//     }
// }


var toExport = SimpleDifficulty;

module.exports = toExport;