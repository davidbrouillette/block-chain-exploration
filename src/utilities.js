function getTimeStamp(){
    return parseInt(Math.round((new Date().getTime() / 1000)));
}


module.exports = {
    getTimeStamp
}