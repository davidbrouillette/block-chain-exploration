calculateHash(index, previousHash, timestamp, data){

    return window.crypto.subtle.digest(
        "SHA-256",
        new TextEncoder("utf-8".encode(index + previousHash + timestamp + data))
    )
    .then((hash)=>{
        return hash.toString();
    });

}