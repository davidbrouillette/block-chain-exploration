function getTimeStamp(){
    return parseInt(Math.round((new Date().getTime() / 1000)));
}

function range(start, end, step=1) {
    let index = -1;
    let length = Math.max(Math.ceil((end - start) / (step || 1)), 0);
    let result = Array(length);

    while (length--) {
      result[++index] = start;
      start += step;
    }

    return result;
}

function arrayRandomFill(len, magnitude=100, max=10){
    return new Array(len).map((elm,index,arr)=>{
        return ((Math.random * magnitude) % max);
    });
    
}


module.exports = {
    getTimeStamp,
    range,
    arrayRandomFill
}